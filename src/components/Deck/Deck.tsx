import React, {useContext} from 'react';
import '../Hand/Card/Card';
import {Card} from "../Hand/Card/Card";
import {observer} from "mobx-react";
import {RootStoreContext} from "../../App";
import "./Deck.css";

const Deck: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const cards = rootStore.deckStore.cards;

    return (
        <div className={"deck-container"}>
            <h2>DECK</h2>
            <h2>Cards count: {cards.length}</h2>
            <div className="hand">
                {cards && cards.length > 0 ? (
                    <Card key={9} cardStore={cards[cards.length -1]}/>
                ) : (
                    <h2>No more cards in the deck</h2>
                )}
            </div>
        </div>
    );
}


export default observer(Deck);