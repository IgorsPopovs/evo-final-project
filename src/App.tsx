import React, {createContext} from 'react';
import './App.css';
import Deck from "./components/Deck";
import Player from "./components/Player/Player";
import Dealer from "./components/Dealer";

import RootStore from "./stores/RootStore";
import Game from "./components/Hand/HandActions";
import {GameStatus} from "./utils/Constant";
import Messenger from "./components/Messenger/Messenger";
import HandActions from "./components/Hand/HandActions";

const rootStore = new RootStore();
export const RootStoreContext = createContext(rootStore);


function App() {
     return (
        <RootStoreContext.Provider value={rootStore}>
            <div className="App">
                <div>
                    {/*<p> Player isDone: {rootStore.playersHandStore.isDone ? ('Yes') : ('No')} </p>*/}
                    <p> Game status: {rootStore.gameStore.status} </p>
                </div>

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
