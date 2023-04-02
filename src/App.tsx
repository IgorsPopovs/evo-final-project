import React, {useState} from 'react';
import './App.css';
import Deck from "./components/Deck";
import {createDeck} from "./utils/Helper";
import Player from "./components/Player";
import DeckStore from "./stores/DeckStore";
import {CardProps} from "./components/Card";
import {PlayerStore} from "./stores/PlayerStore";
import player from "./components/Player";

const deckStore = new DeckStore();
const playerStore = new PlayerStore();
deckStore.createDeck();

function App() {

    const handleDealCard = () => {
        const card = deckStore.dealCard();
        if (card !== undefined) {
            playerStore.addCard(card);
        }
    };


    return (
        <div className="App">

            <button onClick={handleDealCard}>Deal Card Button</button>
            <p>-------------------------------</p>

            <h2>PLAYER</h2>
            <Player playerStore={playerStore}/>

            <h2>DECK</h2>
            <Deck deckStore={deckStore}/>


        </div>
    );
}

export default App;
