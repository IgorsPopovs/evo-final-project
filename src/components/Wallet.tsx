import React, {useContext} from "react";
import {observer} from "mobx-react";
import {GameStatus} from "../utils/Constant";
import {RootStoreContext} from "../App";
import MakeBet from "./MakeBet";

const Wallet: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    return (
            <div className='wallet-controls'>
                <p> Player's bet: {rootStore.walletStore.bet} </p>
                {rootStore.gameStore.status === GameStatus.playersBet &&
                    <MakeBet/>
                }
                <p>Wallet balance: {rootStore.walletStore.balance}</p>
            </div>
    );
}

export default observer(Wallet);