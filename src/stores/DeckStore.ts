import {makeAutoObservable} from "mobx";
import {CardProps} from "../components/Card";
import {createDeck} from "../utils/Helper";
import RootStore from "./RootStore";

class DeckStore {
    cards: CardProps[] = [];
    rootStore:RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    createDeck(): void {
        this.cards = createDeck();
    }

    dealCard(): CardProps | undefined {
        return this.cards.pop();
    }
}

export default DeckStore;
