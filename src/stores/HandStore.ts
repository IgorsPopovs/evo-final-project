import {reaction, makeAutoObservable, runInAction} from "mobx";
import RootStore from "./RootStore";
import BetStore from "./BetStore";
import CardStore from "./CardStore";

class HandStore {
    id: number;
    cards: CardStore[] = [];
    isDone: boolean = false;
    won: boolean | undefined = undefined;
    rootStore: RootStore;
    betStore: BetStore;

    constructor(rootStore: RootStore, id: number) {
        this.rootStore = rootStore;
        this.betStore = new BetStore(this.rootStore);
        this.id = id;

        reaction(
            () => ({
                won: this.won,
            }),
            ({won}) => {
                if (won === true) console.log('results... I WON!');
                if (won === false) console.log('results... I LOST!');
                if (won === undefined) console.log('results... I Dont know!');
            }
        )

        makeAutoObservable(this);
    }

    setWon(isWon: boolean) {
        runInAction(() => {
            this.won = isWon;
        });
    }
    addCard(card: CardStore) {
        runInAction(() => {
            this.cards.push(card);
        });
    }

    pullCard() {
        return this.cards.pop();
    }

    get calculateScore() {
        let total = 0;
        let aceCount = 0;
        this.cards.forEach((card) => {
            if (card.value === "J" || card.value === "Q" || card.value === "K") {
                total += 10;
            } else if (card.value === "A") {
                aceCount++;
            } else {
                total += Number(card.value);
            }
        });

        for (let i = 0; i < aceCount; i++) {
            console.log('t:' + total + ' aC:' + aceCount + ' i:' + i)
            if (total + 11 + aceCount - i - 1 > 21) {
                total += 1;
            } else {
                total += 11;
            }
        }

        if (total >= 21) {
            this.setDone();
        }

        return total;
    }

    reset() {
        this.cards = [];
        this.isDone = false;
    }

    setDone() {
        runInAction(() => {
            this.isDone = true;
        });
        console.log("done");
    }

    splitHand() {
        const newHand = new HandStore(this.rootStore, this.rootStore.handManagerStore.hands.length);
        const popCard = this.pullCard();
        if (popCard !== undefined) {
            newHand.addCard(popCard)
            newHand.betStore.addBet(this.betStore.bet);
            this.rootStore.handManagerStore.hands.push(newHand);
        }
    }
}

export default HandStore;
