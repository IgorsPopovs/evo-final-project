import {makeAutoObservable} from "mobx";
import RootStore from "./RootStore";
import CardStore from "./CardStore";
import {DecksCount, suits, values} from "../utils/Constant";

class DeckStore {
    private cards: CardStore[] = [];
    private rootStore: RootStore;

    public isDealingAnimation: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.createDeck();
        this.shuffle();
        makeAutoObservable(this);
    }

    public getPosition(): DOMRect {
        const handElement = document.getElementById("card-to-deal");
        if (handElement) {
            return handElement.getBoundingClientRect();
        }
        throw new Error(`Could not find element with id deck`);
    }

    public setDealingAnimation(isActive: boolean) {
        const handElement = document.getElementById("card-to-deal")!;
        if (isActive) {
            this.isDealingAnimation = true;
            handElement.classList.add("card-passing-animation");
        } else {
            this.isDealingAnimation = false;
            handElement.classList.remove("card-passing-animation")
        }

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
