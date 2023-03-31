import {CardProps} from "./Card";
import {suits, values} from "./Constant";

export const createDeck = (): CardProps[] => {
    const deck: CardProps[] = [];

    for (const suit of suits) {
        for (const value of values) {
            const card: CardProps = {suit, value, isHidden: false};
            deck.push(card);
        }
    }

    return deck;
};