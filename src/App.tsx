import React, {useState} from 'react';
import './App.css';
import Deck from "./components/Deck";
import Player from "./components/Player";
import DeckStore from "./stores/DeckStore";
import HandStore from "./stores/HandStore";
import Dealer from "./components/Dealer";
import player from "./components/Player";

const deckStore = new DeckStore();
const playersHandStore = new HandStore();
const dealersHandStore = new HandStore();
deckStore.createDeck(); //TODO: create deck should be triggered on game state "Starting"


function App() {

    const handleDealCard = (receiver: "player" | "dealer") => {
        const card = deckStore.dealCard();
        if (card !== undefined) {
            if (receiver === 'player') {
                playersHandStore.addCard(card);
            }
            if (receiver === 'dealer') {
                dealersHandStore.addCard(card);
            }
        }
    };


    return (
        <div className="App">

            <button onClick={() => handleDealCard('player')}>Deal to Player</button>
            <button onClick={() => handleDealCard('dealer')}>Deal to Dealer</button>
            <p>-------------------------------</p>

            <h2>PLAYER</h2>
            <Player handStore={playersHandStore}/>

            <h2>DEALER</h2>
            <Dealer handStore={dealersHandStore}/>

            <h2>DECK</h2>
            <Deck deckStore={deckStore}/>


        </div>
    );
}

export default App;
