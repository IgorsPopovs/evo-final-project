import React, {useContext} from 'react';
import '../Hand/Card/Card';
import {Card} from "../Hand/Card/Card";
import {observer} from "mobx-react";
import {RootStoreContext} from "../../App";
import "./Deck.css";
import {BlankCard} from "../Hand/Card/BlankCard";

const Deck: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const cards = rootStore.deckStore.getCards;


    return (
        <div className={"deck-container"}>
            <h2>DECK</h2>
            <h2>Cards count: {cards.length}</h2>
            <div className="hand" id="deck">
                {cards && cards.length > 0 ? (
                    <Card key={9} cardStore={cards[cards.length - 1]}/>
                ) : (
                    <h2>No more cards in the deck</h2>
                )}
                <div id="card-to-deal">
                    <BlankCard visible={true}/>
                </div>
            </div>
            {/*{rootStore.dealerStore.isPassingCard && (*/}

            {/*)}*/}
        </div>
    );
}


export default observer(Deck);