import React, {useContext} from "react";
import Hand from "../Hand/Hand";
import Wallet from "../Wallet/Wallet";
import {RootStoreContext} from "../../App";
import HandActions from "../Hand/HandActions/HandActions";
import Bet from "../Wallet/Bet";
import "./Player.css";
import {observer} from "mobx-react";
import PlayerName from "./PlayerName/PlayerName";

const Player: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    return (
        <div className="player-container">
            <PlayerName name={"PLAYER"}/>
            <div className={"player-hands-container"}>
                {rootStore.handManagerStore.hands.map((hand, i) => {
                    return (<div key={i}>
                        <Bet handStore={hand}></Bet>
                        <Hand handStore={hand} owner={"player"}/>
                        <HandActions handStore={hand}/>
                    </div>);
                })}
            </div>
            <Wallet/>
        </div>
    );
}

export default observer(Player);
