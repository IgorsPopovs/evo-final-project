import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Chips, GameStatus} from "../utils/Constant";
import {RootStoreContext} from "../App";

const Wallet: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    const handleSetBet = (amount: number) => {
        rootStore.walletStore.setBet(amount);
    }

    return (
        <div>
            <div className='wallet-controls'>
                <p>Make a bet:</p>
                {Chips.map((chip) => {
                    return <button
                        onClick={() => {
                            handleSetBet(chip)
                        }}
                        disabled={
                            rootStore.gameStore.status !== GameStatus.playersBet ||
                            rootStore.walletStore.balance < chip
                        }
                        key={chip}
                    >{chip}</button>
                })}
            </div>
            <p>Wallet balance: {rootStore.walletStore.balance}</p>
        </div>
    );
}

export default observer(Wallet);