import React, {useState} from 'react';
import {suits, values} from '../utils/Constant';
import './Card';
import {Card, CardProps} from "./Card";
import DeckStore from "../stores/DeckStore";
import {observer} from "mobx-react";

type DeckProps = {
    deckStore: DeckStore;
};

type DeckState = {
    cards: CardProps[];
};

class Deck extends React.Component<DeckProps, DeckState> {
    constructor(props: DeckProps) {
        super(props);
        this.state = {
            cards: this.props.deckStore.cards,
        };
    }

    render() {
        const {cards} = this.state;

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
}

export default observer(Deck);