import React, {useContext} from 'react';
import {RootStoreContext} from "../../App";
import {observer} from "mobx-react";
import {GameStatus} from "../../utils/Constant";
import "./Messenger.css";


const Messenger: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    function getMessage(): string {
        switch (rootStore.gameStore.status) {
            case GameStatus.init:
                return "Initializing..."
            case GameStatus.playersBet:
                return "Make a bet!";
            case GameStatus.initialDeal:
                return "Initial deal...";
            case GameStatus.playersTurn:
                return "Make a bet!"
            case GameStatus.dealersTurn:
                return "Dealer's turn";
            case GameStatus.turnsEnded:
                return "Turns ended!";
            case GameStatus.tie:
                return "Tie!";
            case GameStatus.dealerWon:
                return "Dealer Won!";
            case GameStatus.playerWon:
                return "You Won!";
            default:
                return "";
        }
    }

    return (
        <div className='message-container'>
            <p className='message-text'>Messenger: {getMessage()}</p>
        </div>
    );
}

export default observer(Messenger);