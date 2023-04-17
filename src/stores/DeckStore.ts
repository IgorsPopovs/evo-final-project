import {makeAutoObservable, runInAction} from "mobx";
import {createDeck} from "../utils/Helper";
import RootStore from "./RootStore";
import CardStore from "./CardStore";

class DeckStore {
    cards: CardStore[] = [];
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.createDeck();
        this.shuffle();
        makeAutoObservable(this);
    }

    createDeck(): void {
        runInAction(() => {
            this.cards = createDeck();
        });
    }

    dealCard(): CardStore | undefined {
        return runInAction(() => {
            return this.cards.pop();
        });
    }

    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
}

export default DeckStore;
