export const suits = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;
export const values = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'] as const;

export type Suit = typeof suits[number];
export type Value = typeof values[number];
export const SuitIcons: Record<Suit, string> = {
    'SPADES': 's',
    'HEARTS': 'h',
    'DIAMONDS': 'd',
    'CLUBS': 'c',
}