import React, {createContext} from 'react';
import './App.css';
import Deck from "./components/Deck/Deck";
import Player from "./components/Player/Player";
import Dealer from "./components/Player/Dealer";

import RootStore from "./stores/RootStore";
import Messenger from "./components/Messenger/Messenger";
import BetTimer from "./components/Wallet/BetTimer/BetTimer";
import {Chips, GameStatus} from "./utils/Constant";

const rootStore = new RootStore();
export const RootStoreContext = createContext(rootStore);


function App() {

    const handleTimeout = () => {
        rootStore.handManagerStore.hands.forEach((hand) => {
            if (hand.betStore.getBet === 0) {
                hand.betStore.addBet(Chips[0]);
            }
        })

        rootStore.gameStore.setStatus(GameStatus.initialDeal);
    };

    return (
        <RootStoreContext.Provider value={rootStore}>
            <style>
                @import url('https://fonts.cdnfonts.com/css/comics-deluxe-96168');
            </style>
            <div className="App">
                <div className={"main-container"}>
                    <div className={"top-main-container"}>
                        <Dealer/>
                        <Deck/>
                    </div>
                    <div className={"bottom-main-container"}>
                        <Messenger/>
                        <Player/>
                    </div>
                </div>

            </div>

        </RootStoreContext.Provider>
    );
}

export default App;
