import React, {useContext} from "react";
import {observer} from "mobx-react";
import {GameStatus} from "../utils/Constant";
import {RootStoreContext} from "../App";
import MakeBet from "./MakeBet";
import BettingTimer from "./BettingTimer";

const Wallet: React.FC = () => {
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
            <div className='wallet-controls'>
                <p> Player's bet: {rootStore.walletStore.bet} </p>
                {rootStore.gameStore.status === GameStatus.playersBet &&
                    <BettingTimer onTimeout={handleTimeout} />
                }
                {rootStore.gameStore.status === GameStatus.playersBet &&
                    <MakeBet/>
                }
                <p>Wallet balance: {rootStore.walletStore.balance}</p>
            </div>
    );
}

export default observer(Wallet);