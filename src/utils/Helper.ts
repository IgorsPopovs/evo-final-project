import {Value} from "./Constant";
import {IReactionDisposer} from "mobx";

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