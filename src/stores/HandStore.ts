import {makeAutoObservable, reaction, runInAction} from "mobx";
import RootStore from "./RootStore";
import BetStore from "./BetStore";
import CardStore from "./CardStore";
import {HandCombination, HandStatus, valuesOfTen} from "../utils/Constant";

class HandStore {
    id: number;
    cards: CardStore[] = [];
    isDone: boolean = false;
    status: HandStatus = HandStatus.Playing;
    combination: HandCombination = HandCombination.None;
    rootStore: RootStore;
    betStore: BetStore;

    constructor(rootStore: RootStore, id: number) {
        this.rootStore = rootStore;
        this.betStore = new BetStore(this.rootStore);
        this.id = id;

        reaction(
            () => ({
                status: this.status,
            }),
            ({status}) => {
                if (status === HandStatus.Win) console.log('results... I WON!');
                if (status === HandStatus.Lost) console.log('results... I LOST!');
                if (status === HandStatus.Tie) console.log('results... I Dont know!');
            }
        );

        makeAutoObservable(this);
    }

    public setStatus(status: HandStatus) {
        this.status = status;
    }

    public setCombination(combo: HandCombination) {
        this.combination = combo;
    }

    public addCard(card: CardStore) {
        runInAction(() => {
            this.cards.push(card);
            this.checkIsDone();
            this.assignCombination();
        })
    }

    private assignCombination() {
        if (this.cards.length === 2) {
            if (this.totalScore === 21) this.setCombination(HandCombination.NaturalBlackJack);
        } else {
            if (this.totalScore === 21) this.setCombination(HandCombination.BlackJack);
        }
        if (this.checkSplit()) this.setCombination(HandCombination.Split);
        if (this.totalScore > 21) this.setCombination(HandCombination.Bust);
    }

    private checkSplit() {
        return (
            (this.cards.length === 2) && (
                (this.cards[0].value === this.cards[1].value) || (
                    valuesOfTen.includes(this.cards[0].value) && valuesOfTen.includes(this.cards[1].value)
                )
            )
        );
    }

    // public checkNaturalBlackJack(){
    //     if (this.totalScore === 21) {
    //         this.setCombination(HandCombination.NaturalBlackJack);
    //     }
    // }

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
