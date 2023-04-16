import React, {useContext} from "react";
import Hand from "./Hand/Hand";
import Wallet from "./Wallet/Wallet";
import {RootStoreContext} from "../App";
import HandActions from "./Hand/HandActions";
import {observer} from "mobx-react";
import HandStore from "../stores/HandStore";

type betProps = {
    handStore: HandStore;
};
const Bet: React.FC<betProps> = ({handStore}) => {
    return (
        <div>
            <p> Player's bet: {handStore.betStore.getBet} </p>
        </div>
    );
}

export default observer(Bet);
