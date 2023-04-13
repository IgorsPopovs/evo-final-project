import React, {useContext} from "react";
import Hand from "./Hand";
import Wallet from "./Wallet";
import {RootStoreContext} from "../App";
import BettingTimer from "./BettingTimer";
import {GameStatus} from "../utils/Constant";

const Player: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    const handleTimeout = () => {
        if (rootStore.walletStore.bet === 0) {
            rootStore.gameStore.setStatus(GameStatus.init); // TODO: What should happen?
        } else {
            rootStore.gameStore.setStatus(GameStatus.initialDeal);
            rootStore.dealerStore.initDeal();
            console.log('Betting timer has ended');
        }
    };


    return (
        <div>
            <Hand handStore={rootStore.playersHandStore} owner={"player"}/>
            {rootStore.gameStore.status === GameStatus.playersBet &&
                <BettingTimer onTimeout={handleTimeout} />
            }
            <Wallet/>
        </div>
    );
}

export default (Player);
