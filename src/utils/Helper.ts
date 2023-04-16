import {CardProps} from "../components/Hand/Card/Card";
import {DecksCount, suits, Value, values} from "./Constant";

export const createDeck = (): CardProps[] => {
    const deck: CardProps[] = [];
    for (let i = 0; i < DecksCount; i++) {
        for (const suit of suits) {
            for (const value of values) {
                const card: CardProps = {suit, value, isHidden: true};
                deck.push(card);
            }
        }
    }

    return deck;
};

export const getCardScore = (sum: number, value: Value): number => {
    switch (value) {
        case 'A':
            return 11;
            break;
        case 'J':
            return 10;
            break;
        case 'Q':
            return 10;
            break;
        case 'K':
            return 10;
            break;
        default:
            return Number(value);
    }
}