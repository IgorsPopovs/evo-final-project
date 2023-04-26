import React, {useContext} from "react";
import Hand from "../Hand/Hand";
import Wallet from "../Wallet/Wallet";
import {RootStoreContext} from "../../App";
import HandActions from "../Hand/HandActions";
import Bet from "../Wallet/Bet";
import "./Player.css";
import {observer} from "mobx-react";
import {GameStatus} from "../../utils/Constant";

const Player: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    return (
        <div className={"player-container"}>
            <h2>PLAYER</h2>
            <div className={"player-hands-container"}>
                {rootStore.handManagerStore.hands.map((hand, i) => {
                    return (<div key={i}>
                        <Bet handStore={hand}></Bet>
                        <Hand handStore={hand} owner={"player"}/>
                        <div className="hand-actions-container">
                            {rootStore.gameStore.getStatus() === GameStatus.playersTurn &&
                                <HandActions handStore={hand}/>
                            }
                        </div>
                    </div>);
                })}
            </div>
            <Wallet/>
        </div>
    );
}

export default observer(Player);
