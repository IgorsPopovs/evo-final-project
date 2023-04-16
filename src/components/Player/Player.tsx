import React, {useContext} from "react";
import Hand from "../Hand/Hand";
import Wallet from "../Wallet/Wallet";
import {RootStoreContext} from "../../App";
import HandActions from "../Hand/HandActions";
import Bet from "../Bet";
import "./Player.css";
import {observer} from "mobx-react";

const Player: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    return (
        <div className={"playerContainer"}>
            <div className={"playerHandsContainer"}>
                {rootStore.handManagerStore.hands.map((hand,i) => {
                    return (<div key={i} >
                        <Hand handStore={hand} owner={"player"}/>
                        <Bet handStore={hand}></Bet>
                        <HandActions handStore={hand}/>
                    </div>);
                })}
            </div>
            <Wallet/>
        </div>
    );
}

export default observer(Player);
