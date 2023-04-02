import React, {useState} from 'react';
import './App.css';
import Deck from "./components/Deck";
import Player from "./components/Player";
import Dealer from "./components/Dealer";

import RootStore from "./stores/RootStore";

const rootStore = new RootStore();

//TODO: triggered on game state "Starting"
rootStore.deckStore.createDeck();
rootStore.walletStore.setBalance(3333);


function App() {

    const handleDealCard = (receiver: "player" | "dealer") => {
        const card = rootStore.deckStore.dealCard();
        if (card !== undefined) {
            if (receiver === 'player') {
                rootStore.playersHandStore.addCard(card);
            }
            if (receiver === 'dealer') {
                rootStore.dealersHandStore.addCard(card);
            }
        }
    };


    return (
        <div className="App">

            <button onClick={() => handleDealCard('player')}>Deal to Player</button>
            <button onClick={() => handleDealCard('dealer')}>Deal to Dealer</button>
            <p>-------------------------------</p>

            <h2>PLAYER</h2>
            <Player handStore={rootStore.playersHandStore} walletStore={rootStore.walletStore}/>

            <h2>DEALER</h2>
            <Dealer handStore={rootStore.dealersHandStore}/>

            <h2>DECK</h2>
            <Deck deckStore={rootStore.deckStore}/>


        </div>
    );
}

export default App;
