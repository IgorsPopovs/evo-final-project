import {action, makeObservable, observable} from "mobx";
import {CardProps} from "../components/Hand/Card/Card";
import {createDeck} from "../utils/Helper";
import RootStore from "./RootStore";
import {Balance} from "../utils/Constant";

class DeckStore {
    cards: CardProps[] = [];
    rootStore:RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            cards: observable,
            createDeck: action,
            dealCard: action,
            shuffle: action,
        });
        this.rootStore = rootStore;

        this.createDeck();
        this.shuffle();
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
