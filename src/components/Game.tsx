import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {RootStoreContext} from "../App";
import {autorun} from "mobx";
import {GameStatus} from "../utils/Constant";

const Game: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    autorun(() => {
        if (rootStore.gameStore.status === GameStatus.playersTurn &&
            rootStore.playersHandStore.isDone) {
            rootStore.gameStore.setStatus(GameStatus.dealersTurn);
        }

    })

    autorun(() => {
        if (
            rootStore.playersHandStore.isDone &&
            rootStore.dealersHandStore.isDone &&
            rootStore.gameStore.status === GameStatus.dealersTurn
        ) {
            const playerScore = rootStore.playersHandStore.calculateScore;
            const dealerScore = rootStore.dealersHandStore.calculateScore
            if (
                (playerScore > dealerScore && playerScore <= 21) ||
                dealerScore > 21
            ){
                rootStore.walletStore.deposit(rootStore.walletStore.bet + rootStore.walletStore.bet);
                rootStore.walletStore.setBet(0);
                rootStore.gameStore.setStatus(GameStatus.playerWon);
            } else if (
                (playerScore < dealerScore && dealerScore <= 21) ||
                playerScore > 21
            ) {
                rootStore.walletStore.setBet(0);
                rootStore.gameStore.setStatus(GameStatus.dealerWon);
            } else if (playerScore === dealerScore) {
                rootStore.walletStore.deposit(rootStore.walletStore.bet);
                rootStore.walletStore.setBet(0);
                rootStore.gameStore.setStatus(GameStatus.tie);
            }
        }
    })

    const handleDealCard = () => {
        const card = rootStore.deckStore.dealCard();
        if (card !== undefined) {
            rootStore.gameStore.setStatus(GameStatus.playersTurn);
            rootStore.playersHandStore.addCard(card);
        }
    };

    const handleStay = () => {
        rootStore.playersHandStore.setDone();
    }

    const handleReset = () => {
        console.log("Resetting...");
        rootStore.gameStore.setStatus(GameStatus.playersBet);
        rootStore.dealersHandStore.reset();
        rootStore.playersHandStore.reset();
        rootStore.deckStore.createDeck();
        rootStore.deckStore.shuffle();
    }

    return (
        <div>
            <div>
                {/*<p> Player isDone: {rootStore.playersHandStore.isDone ? ('Yes') : ('No')} </p>*/}
                <p> Game status: {rootStore.gameStore.status} </p>
            </div>
            <div>
                <button
                    disabled={
                        rootStore.playersHandStore.isDone ||
                        !rootStore.walletStore.betPlaced
                    }
                    onClick={() => handleDealCard()}
                >Hit
                </button>
                <button
                    disabled={
                        !(!rootStore.playersHandStore.isDone &&
                            rootStore.gameStore.status === GameStatus.playersTurn)
                    }
                    onClick={() => handleStay()}
                >
                    Stay
                </button>
                <button
                    onClick={() => handleReset()}
                >
                    reset
                </button>
                {/*<button*/}
                {/*    disabled={*/}
                {/*        rootStore.dealersHandStore.isDone === true*/}
                {/*    }*/}
                {/*    onClick={() => handleDealCard('dealer')}*/}
                {/*>Deal to Dealer*/}
                {/*</button>*/}
                {/*<button onClick={() => handleShuffle()}>Shuffle</button>*/}

            </div>
        </div>
    );
}

export default observer(Game);