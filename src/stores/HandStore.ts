import {makeObservable, observable, action, computed} from "mobx";
import {CardProps} from "../components/Card";
import RootStore from "./RootStore";
import {getCardScore} from "../utils/Helper";

class HandStore {
    cards: CardProps[] = [];
    score: number = 0;
    isDone = false;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            cards: observable,
            isDone: observable,
            score: observable,
            addCard: action,
            reset: action,
            // totalValue: computed,
            calculateScore: action,
        });
        this.rootStore = rootStore;
    }

    addCard(card: CardProps) {
        this.cards.push(card);
        // this.score += (this.score, getCardScore(card.value));
        this.calculateScore();
    }

    // get isDone() {
    //     console.log(this.totalValue);
    //     return this.totalValue >= 21;
    // }

    // get totalValue() {
    calculateScore() {
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
            console.log('t:' + total + ' aC:'+ aceCount + ' i:' + i)
            if (total + 11 + aceCount - i - 1 > 21) {
                total += 1;
            } else {
                total += 11;
            }
        }

        this.score = total;
        if (total >= 21) {
            this.toggleDone();
        }
    }


    reset() {
        this.cards = [];
        this.isDone = false;
    }

    toggleDone() {
        this.isDone = !this.isDone;
    }
}


export default HandStore;
