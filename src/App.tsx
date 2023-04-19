import React, {createContext} from 'react';
import './App.css';
import Deck from "./components/Deck/Deck";
import Player from "./components/Player/Player";
import Dealer from "./components/Player/Dealer";

import RootStore from "./stores/RootStore";
import Messenger from "./components/Messenger/Messenger";

const rootStore = new RootStore();
export const RootStoreContext = createContext(rootStore);


function App() {
    return (
        <RootStoreContext.Provider value={rootStore}>
            <div className="App">
                <div>
                    {/*<p> Player isDone: {rootStore.playersHandStore.isDone ? ('Yes') : ('No')} </p>*/}
                    <p> Game status: {rootStore.gameStore.getStatus()} </p>
                </div>

                <Messenger/>
                <p>-------------------------------</p>
                <div className={"main-container"}>
                    <div className={"top-main-container"}>
                        <Dealer/>
                        <Deck/>
                    </div>
                    <Player/>
                </div>
            </div>
        </RootStoreContext.Provider>
    );
}

export default App;
