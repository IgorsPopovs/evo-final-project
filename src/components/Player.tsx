import React from "react";
import HandStore from "../stores/HandStore";
import Hand from "./Hand";
import Wallet from "./Wallet";
import WalletStore from "../stores/WalletStore";

interface IPlayerProps {
    handStore: HandStore;
    walletStore: WalletStore;
}

const Player: React.FC<IPlayerProps> = ({handStore, walletStore}) => {
    return (
        <div>
            <Hand handStore={handStore} owner={"player"}/>
            <Wallet walletStore={walletStore}/>
        </div>
    );
}

export default (Player);
