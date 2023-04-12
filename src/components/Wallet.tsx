import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Chips, GameStatus} from "../utils/Constant";
import {RootStoreContext} from "../App";
import {autorun} from "mobx";

const Wallet: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    // autorun (()=>{
    //     console.log(rootStore.walletStore.balance);
    // })
    // autorun(() => {
    //     if (
    //         rootStore.gameStore.status === GameStatus.playerWon &&
    //         rootStore.walletStore.bet > 0
    //     ) {
    //         rootStore.walletStore.setBalance(rootStore.walletStore.balance * 2);
    //         rootStore.walletStore.setBet(0);
    //     }
    //     if (
    //         rootStore.gameStore.status === GameStatus.dealerWon &&
    //         rootStore.walletStore.bet > 0
    //     ) {
    //         rootStore.walletStore.setBet(0);
    //     }
    // });

    const handleSetBet = (amount: number) => {
        rootStore.walletStore.addBet(amount);
    }

    return (
        <div>
            <div className='wallet-controls'>
                <p> Player's bet: {rootStore.walletStore.bet} </p>
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