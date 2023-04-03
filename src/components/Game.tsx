import React, {Component} from 'react';
import {observer} from "mobx-react";
import rootStore from "../stores/RootStore";
import RootStore from "../stores/RootStore";
import GameStore from "../stores/GameStore";

type GameProps = {
    gameStore: GameStore;
}

type GameState = {
    rootStore: RootStore;
}

class Game extends React.Component <GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            rootStore: this.props.gameStore.rootStore,
        }
    }

    render() {
        const {rootStore} = this.state;
        return (
            <div>
                <p> Player isDone: {rootStore.playersHandStore.isDone ? ('Yes') : ('No')} </p>
                <p> Player's bet: {rootStore.walletStore.bet}</p>
                <p> Game status: {rootStore.gameStore.status}</p>
            </div>
        );
    }
}

export default observer(Game);