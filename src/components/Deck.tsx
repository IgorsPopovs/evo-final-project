import React, {useState} from 'react';
import './Card';
import {Card, CardProps} from "./Card";
import DeckStore from "../stores/DeckStore";
import {observer} from "mobx-react";

type DeckProps = {
    deckStore: DeckStore;
};

const Deck: React.FC<DeckProps> = ({deckStore}) => {
    const [cards, setCards] = React.useState<CardProps[]>(deckStore.cards);

    return (
        <div>
            <h2>Cards count: {cards.length}</h2>
            <div className="hand">
                {/*{console.log(cards)}*/}
                {cards && cards.length > 0 ? (
                    <Card
                        value={cards[cards.length - 1].value}
                        suit={cards[cards.length - 1].suit}
                        isHidden={cards[cards.length - 1].isHidden}
                    />
                ) : (
                    <h2>No more cards in the deck</h2>
                )}
            </div>
        </div>
    );
}


export default observer(Deck);