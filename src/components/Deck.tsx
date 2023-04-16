import React, {useContext} from 'react';
import './Card/Card';
import {Card} from "./Card/Card";
import {observer} from "mobx-react";
import {RootStoreContext} from "../App";

const Deck: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const cards = rootStore.deckStore.cards;

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