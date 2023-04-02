import React from "react";
import {observer} from "mobx-react";
import WalletStore from "../stores/WalletStore";

interface IWalletProps {
    walletStore: WalletStore;
}

class Wallet extends React.Component<IWalletProps> {

    // walletStore = new WalletStore();

    render() {
        const {walletStore} = this.props;
        return (
            <div>
                <p>Wallet balance: {walletStore.balance}</p>
            </div>
        );
    }
}

export default observer(Wallet);