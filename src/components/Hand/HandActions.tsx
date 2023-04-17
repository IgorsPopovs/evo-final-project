import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {RootStoreContext} from "../../App";
import {GameStatus, Users} from "../../utils/Constant";
import HandStore from "../../stores/HandStore";

type HandActionsProps = {
    handStore: HandStore;
}

const HandActions: React.FC<HandActionsProps> = ({handStore}) => {
    const {
        gameStore,
        dealerStore,
        dealersHandStore,
        handManagerStore,
        deckStore
    } = useContext(RootStoreContext);

    const handleHit = () => {
        dealerStore.hit(Users.Player, false, handStore.id);
    };

    const handleStay = () => {
        handStore.setDone();
    };

    const handleSplit = () => {
        handStore.splitHand();
    };

    const handleReset = () => {
        console.log("Resetting...");
        gameStore.setStatus(GameStatus.playersBet);
        dealersHandStore.reset();
        //rootStore.playersHandStore.reset();
        handManagerStore.resetAll();
        deckStore.createDeck();
        deckStore.shuffle();
    }

    return (
        <div>
            <div>
                <button
                    disabled={
                        handStore.isDone ||
                        gameStore.status !== GameStatus.playersTurn
                    }
                    onClick={() => handleHit()}
                >
                    Hit
                </button>
                <button
                    disabled={
                        !(!handStore.isDone &&
                            gameStore.status === GameStatus.playersTurn)
                    }
                    onClick={() => handleStay()}
                >
                    Stay
                </button>
                <button
                    disabled={
                        handStore.isDone ||
                        handManagerStore.hands.length === 2
                    }
                    onClick={() => handleSplit()}
                >
                    Split
                </button>
                <button
                    onClick={() => handleReset()}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default observer(HandActions);