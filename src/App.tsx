import React, {createContext, useReducer} from 'react';
import './App.css';
import Deck from "./components/Deck/Deck";
import Player from "./components/Player/Player";
import Dealer from "./components/Player/Dealer";

import RootStore from "./stores/RootStore";
import Messenger from "./components/Messenger/Messenger";
import {Stage, Container, useTick, PixiComponent, _ReactPixi, Sprite} from "@pixi/react";
import {Graphics} from "pixi.js";
import {stageParams} from "./utils/Parameters";

const rootStore = new RootStore();
export const RootStoreContext = createContext(rootStore);


interface RectangleProps {
    x: number
    y: number
    width: number
    height: number
    color: number
}

function App() {
    return (
        <RootStoreContext.Provider value={rootStore}>
            <Stage width={stageParams.width} height={stageParams.height}>
                <Container x={stageParams.width/2} y={100} anchor={0.5}>
                    <Dealer/>
                    <Deck/>
                </Container>
                <Container x={stageParams.width/2} y={600} anchor={1}>
                    <Player/>
                </Container>
            </Stage>
            <div className="App">
                <div>
                    {/*<p> Player isDone: {rootStore.playersHandStore.isDone ? ('Yes') : ('No')} </p>*/}
                    <p> Game status: {rootStore.gameStore.getStatus()} </p>
                </div>

                <Messenger/>
                <p>-------------------------------</p>
                <div className={"main-container"}>
                    <div className={"top-main-container"}>
                        {/*<Dealer/>*/}
                        {/*<Deck/>*/}
                    </div>
                    {/*<Player/>*/}
                </div>
            </div>
        </RootStoreContext.Provider>
    );
}

export default App;
