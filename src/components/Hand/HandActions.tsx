import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {RootStoreContext} from "../../App";
import {GameStatus} from "../../utils/Constant";
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
                    disabled={!handStore.handActionsStore.doubleEnabled}
                    onClick={() => dealerStore.double(handStore)}
                >
                    Double
                </button>
                <button
                    disabled={
                        handStore.isDone ||
                        gameStore.status !== GameStatus.playersTurn
                    }
                    onClick={() => dealerStore.hit(handStore, false)}
                >
                    Hit
                </button>
                <button
                    disabled={
                        !(!handStore.isDone &&
                            gameStore.status === GameStatus.playersTurn)
                    }
                    onClick={() => handStore.setDone()}
                >
                    Stay
                </button>
                <button
                    disabled={!handStore.handActionsStore.splitEnabled}
                    onClick={() => handStore.splitHand()}
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