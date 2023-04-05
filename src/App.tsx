import React, {createContext} from 'react';
import './App.css';
import Deck from "./components/Deck";
import Player from "./components/Player";
import Dealer from "./components/Dealer";

import RootStore from "./stores/RootStore";
import Game from "./components/Game";
import {GameStatus} from "./utils/Constant";
import Messenger from "./components/Messenger/Messenger";

const rootStore = new RootStore();
export const RootStoreContext = createContext(rootStore);

//TODO: triggered on game state "Starting"
rootStore.deckStore.createDeck();
rootStore.deckStore.shuffle();
rootStore.walletStore.setBalance(1500);



function App() {
     return (
        <RootStoreContext.Provider value={rootStore}>
            <div className="App">

                <Game/>
                <Messenger/>
                <p>-------------------------------</p>

                <h2>PLAYER</h2>
                <Player/>

                <h2>DEALER</h2>
                <Dealer/>

                <h2>DECK</h2>
                <Deck/>


            </div>
        </RootStoreContext.Provider>
    );
}

export default App;
