import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {RootStoreContext} from "../../../App";
import {GameStatus, HandStatus} from "../../../utils/Constant";
import HandStore from "../../../stores/HandStore";
import "./HandActions.css";

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

    return (
        <div className={`hand-actions-container`}>
            <div className={`${handStore.getStatus() === HandStatus.Playing ? '' : 'hidden'}`}>
                <button
                    disabled={!handStore.handActionsStore.doubleEnabled}
                    onClick={() => dealerStore.double(handStore)}
                >
                    Double
                </button>
                <button
                    disabled={!handStore.handActionsStore.hitEnabled}
                    onClick={() => dealerStore.hit(handStore, false)}
                >
                    Hit
                </button>
                <button
                    disabled={!handStore.handActionsStore.stayEnabled}
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
            </div>
        </div>
    );
};

export default observer(HandActions);