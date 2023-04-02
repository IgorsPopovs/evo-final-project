export const suits = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;
export const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

export type Suit = typeof suits[number];
export type Value = typeof values[number];
export const SuitIcons: Record<Suit, string> = {
    'SPADES': '♠️',
    'HEARTS': '♥️',
    'DIAMONDS': '♦️',
    'CLUBS': '♣️',
}