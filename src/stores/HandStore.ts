import {makeObservable, observable, action} from "mobx";
import {CardProps} from "../components/Card";
import RootStore from "./RootStore";

class HandStore {
    cards: CardProps[] = [];
    isDone = false;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            cards: observable,
            isDone: observable,
            addCard: action,
            reset: action,
            toggleDone: action,
        });
        this.rootStore = rootStore;
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
