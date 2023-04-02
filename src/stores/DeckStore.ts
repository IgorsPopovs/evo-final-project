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

    shuffle():void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
}

export default DeckStore;
