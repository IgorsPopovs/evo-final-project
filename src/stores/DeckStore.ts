import {makeAutoObservable} from "mobx";
import {CardProps} from "../components/Card";
import {createDeck} from "../utils/Helper";

class DeckStore {
    cards: CardProps[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    createDeck(): void {
        this.cards = createDeck();
    }

    dealCard(): CardProps | undefined {
        return this.cards.pop();
    }
}

export default DeckStore;
