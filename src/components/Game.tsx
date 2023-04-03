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

        const handleShuffle = () => {
            rootStore.deckStore.shuffle();
        }

        return (
            <div>
                <div>
                    <p> Player isDone: {rootStore.playersHandStore.isDone ? ('Yes') : ('No')} </p>
                    <p> Player's bet: {rootStore.walletStore.bet} </p>
                    <p> Game status: {rootStore.gameStore.status} </p>
                </div>
                <div>
                    <button
                        disabled={rootStore.playersHandStore.isDone === true}
                        onClick={() => handleDealCard('player')}
                    >Deal to Player
                    </button>
                    <button onClick={() => handleDealCard('dealer')}>Deal to Dealer</button>
                    <button onClick={() => handleShuffle()}>Shuffle</button>
                </div>
            </div>
        );
    }
}

export default observer(Game);