import React from "react";
import {observer} from "mobx-react";
import HandStore from "../stores/HandStore";
import {Card} from "./Card";
import Hand from "./Hand";
import Wallet from "./Wallet";
import WalletStore from "../stores/WalletStore";

interface IPlayerProps {
    handStore: HandStore;
    walletStore: WalletStore;
}

class Player extends React.Component<IPlayerProps> {
    render() {
        const {handStore, walletStore} = this.props;
        return (
            <div>
                <Hand handStore={handStore} owner={"player"}/>
                <Wallet walletStore={walletStore}/>
            </div>
        );
    }
}

export default (Player);
