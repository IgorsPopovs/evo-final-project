import {makeAutoObservable} from "mobx";
import RootStore from "./RootStore";
import CardStore from "./CardStore";
import {DecksCount, suits, values} from "../utils/Constant";

class DeckStore {
    private cards: CardStore[] = [];
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.createDeck();
        this.shuffle();
        makeAutoObservable(this);
    }

    public get getCards() {
        return this.cards;
    }

    public createDeck() {
        this.cards = [];
        for (let i = 0; i < DecksCount; i++) {
            for (const suit of suits) {
                for (const value of values) {
                    const card = new CardStore({suit, value, isHidden: true});
                    this.cards.push(card);
                }
            }
        }
    };

    public dealCard(): CardStore | undefined {
        return this.cards.pop();
    }

    public shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
}

export default DeckStore;
