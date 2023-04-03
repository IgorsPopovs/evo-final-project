import React, {createContext} from 'react';
import './App.css';
import Deck from "./components/Deck";
import Player from "./components/Player";
import Dealer from "./components/Dealer";

import RootStore from "./stores/RootStore";
import Game from "./components/Game";
import {autorun} from "mobx";
import {GameStatus} from "./utils/Constant";

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

//TODO: triggered on game state "Starting"
rootStore.deckStore.createDeck();
rootStore.walletStore.setBalance(1500);

autorun(() => {
    // console.log("Game status: " + rootStore.gameStore.status);
    // console.log("Score: " + rootStore.playersHandStore.score);
    if (rootStore.gameStore.status === GameStatus.dealerFinished) {
        if (rootStore.playersHandStore.score > rootStore.dealersHandStore.score) {
            rootStore.gameStore.setStatus(GameStatus.playerWon);
        }
        if (rootStore.playersHandStore.score < rootStore.dealersHandStore.score) {
            rootStore.gameStore.setStatus(GameStatus.dealerWon);
        }
        if (rootStore.playersHandStore.score === rootStore.dealersHandStore.score) {
            rootStore.gameStore.setStatus(GameStatus.tie);
        }
    }
})

function App() {
    rootStore.gameStore.setStatus(GameStatus.playersBet);
    return (
        <RootStoreContext.Provider value={rootStore}>
            <div className="App">

                <Game gameStore={rootStore.gameStore}/>
                <p>-------------------------------</p>

                <h2>PLAYER</h2>
                <Player handStore={rootStore.playersHandStore} walletStore={rootStore.walletStore}/>

                <h2>DEALER</h2>
                <Dealer handStore={rootStore.dealersHandStore}/>

                <h2>DECK</h2>
                <Deck deckStore={rootStore.deckStore}/>


            </div>
        </RootStoreContext.Provider>
    );
}

export default App;
