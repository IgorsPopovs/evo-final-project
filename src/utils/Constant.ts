export const suits = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;
// export const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
export const values = ['A', 'A', 'A', 'A', 'J', 'K', 'Q'] as const;


export type Suit = typeof suits[number];
export type Value = typeof values[number];
export const SuitIcons: Record<Suit, string> = {
    'SPADES': '♠️',
    'HEARTS': '♥️',
    'DIAMONDS': '♦️',
    'CLUBS': '♣️',
};

export enum GameStatus {
    'init',
    'playersBet',
    'initialDeal',
    'playersTurn',
    'dealersTurn',
    'turnsEnded',
}

export enum HandStatus {
    'Waiting',
    'Playing',
    'Win',
    'Lost',
    'Tie',
}

export enum HandCombination {
    'None',
    'Split',
    'BlackJack',
    'NaturalBlackJack',
    'Bust',
}

export const Chips = [20, 50, 100, 200, 500, 1000] as const;

export const bettingTime: number = 555; //15

export const Balance: number = 1500;

export const DecksCount: number = 4;