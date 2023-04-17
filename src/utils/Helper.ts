import {DecksCount, suits, Value, values} from "./Constant";
import CardStore from "../stores/CardStore";
import {IReactionDisposer} from "mobx";

export const createDeck = (): CardStore[] => {
    const deck: CardStore[] = [];
    for (let i = 0; i < DecksCount; i++) {
        for (const suit of suits) {
            for (const value of values) {
                const card = new CardStore({suit, value, isHidden: true});
                deck.push(card);
            }
        }
    }

    return deck;
};

export const dispose = (disposers: IReactionDisposer[]): IReactionDisposer[] => {
    disposers.forEach((disposer) => disposer());
    return [];
}

export const getCardScore = (sum: number, value: Value): number => {
    switch (value) {
        case 'A':
            return 11;
        case 'J':
            return 10;
        case 'Q':
            return 10;
        case 'K':
            return 10;
        default:
            return Number(value);
    }
}