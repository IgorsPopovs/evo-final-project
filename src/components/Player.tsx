import React, {useContext} from "react";
import Hand from "./Hand";
import Wallet from "./Wallet";
import {RootStoreContext} from "../App";
import BettingTimer from "./BettingTimer";
import {GameStatus} from "../utils/Constant";

const Player: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    return (
        <div>
            <Hand handStore={rootStore.playersHandStore} owner={"player"}/>
            <Wallet/>
        </div>
    );
}

export default (Player);
