import React from "react";
import {observer} from "mobx-react";
import WalletStore from "../stores/WalletStore";
import {Chips} from "../utils/Constant";

interface IWalletProps {
    walletStore: WalletStore;
}

class Wallet extends React.Component<IWalletProps> {

    // walletStore = new WalletStore();


    render() {
        const {walletStore} = this.props;
        const handleSetBet = (amount: number) => {
            walletStore.setBet(amount);
        }
        return (
            <div>
                <div className='wallet-controls'>
                    <p>Make a bet:</p>
                    {Chips.map((chip) => {
                        return <button onClick={() => {handleSetBet(chip)}}>{chip}</button>
                    })}
                </div>
                <p>Wallet balance: {walletStore.balance}</p>
            </div>
        );
    }
}

export default observer(Wallet);