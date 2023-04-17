import {makeAutoObservable} from "mobx";
import {Suit, Value} from "../utils/Constant";

export type CardStoreProps2 = {
    suit: Suit;
    value: Value;
    isHidden: boolean;
};
class CardStore {
    public suit: Suit;
    public value: Value;
    public isHidden: boolean;
    constructor(card: CardStoreProps2) {
        this.suit = card.suit;
        this.value = card.value;
        this.isHidden = card.isHidden;
        makeAutoObservable(this);
    }

    public expose(): void {
            this.isHidden = false;
    }
}

export default CardStore;
