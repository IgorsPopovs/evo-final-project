import React, {useState} from 'react';
import './App.css';
import Deck from "./components/Deck";
import Player from "./components/Player";
import DeckStore from "./stores/DeckStore";
import HandStore from "./stores/HandStore";

const deckStore = new DeckStore();
const handStore = new HandStore();
deckStore.createDeck(); //TODO: create deck should be triggered on game state "Starting"

function App() {

    const handleDealCard = () => {
        const card = deckStore.dealCard();
        if (card !== undefined) {
            handStore.addCard(card);
        }
    };


    return (
        <div className="App">

            <button onClick={handleDealCard}>Deal Card Button</button>
            <p>-------------------------------</p>

            <h2>PLAYER</h2>
            <Player playerStore={handStore}/>

            <h2>DECK</h2>
            <Deck deckStore={deckStore}/>


        </div>
    );
}

export default App;
