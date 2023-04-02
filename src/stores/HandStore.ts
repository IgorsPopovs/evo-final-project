import { makeObservable, observable, action } from "mobx";
import { CardProps } from "../components/Card";

export class HandStore {
    cards: CardProps[] = [];
    isDone = false;

    constructor() {
        makeObservable(this, {
            cards: observable,
            isDone: observable,
            addCard: action,
            reset: action,
            toggleDone: action,
        });
    }

    addCard(card: CardProps) {
        this.cards.push(card);
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
