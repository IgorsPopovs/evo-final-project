import React, {useState} from 'react';
import {suits, values} from './Constant';
import './Card';
import {Card, CardProps} from "./Card";

type DeckProps = {
    cards: CardProps[];
};

const Deck: React.FC<DeckProps> = ({cards}) => {
    const [deck, setDeck] = useState<CardProps[]>(cards);

    return (
        <div>
            <h1>DECK</h1>
            <p>Cards count: {deck.length}</p>
            {deck.map((card, index) => (
                <Card key={index} suit={card.suit} value={card.value} isHidden={card.isHidden} />
            ))}
        </div>
    );
}

export default Deck;