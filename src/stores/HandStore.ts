import {reaction, makeAutoObservable, autorun, runInAction} from "mobx";
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
        );

        makeAutoObservable(this);
    }

    setWon(isWon: boolean) {
        this.won = isWon;
    }

    public addCard(card: CardStore) {
        runInAction(() => {
            this.cards.push(card);
            this.checkIsDone();
        })

    }

    private checkIsDone() {
        if (this.totalScore >= 21) {
            this.setDone();
        }
    }

    private pullCard() {
        return this.cards.pop();
    }

    public get totalScore() {
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

        return total;
    }

    public reset() {
        this.cards = [];
        this.isDone = false;
    }

    public setDone() {
        this.isDone = true;
        console.log("done");
    }

    public splitHand() {
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
