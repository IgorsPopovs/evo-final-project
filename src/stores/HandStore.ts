import {makeObservable, observable, action} from "mobx";
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
            toggleDone: action,
        });
        this.rootStore = rootStore;
    }

    addCard(card: CardProps) {
        this.cards.push(card);
        // this.score += (this.score, getCardScore(card.value));
    }

    get totalValue() {
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
            if (total + 11 + aceCount - i > 21) {
                total += 1;
            } else {
                total += 11;
            }
        }

        return total;
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
