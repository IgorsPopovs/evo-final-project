import React from "react";
import {observer} from "mobx-react";
import HandStore from "../../../stores/HandStore";
import "./Bet.css";
import {HandStatus} from "../../../utils/Constant";

type betProps = {
    handStore: HandStore;
};
const Bet: React.FC<betProps> = ({handStore}) => {
    const classes = [];
    if (handStore.betStore.getBet > 0) classes.push('bet-green-anim');
    if (handStore.getStatus() === HandStatus.Tie) classes.push('bet-tie');
    if (handStore.getStatus() === HandStatus.Won) classes.push('bet-win');
    if (handStore.getStatus() === HandStatus.Lost) classes.push('bet-lost');

    return (
        <>
            <div className={`bet-container ${classes.join(' ')}`}>
                <p>bet: {handStore.betStore.getBet}</p>
            </div>
        </>
    );

}

export default observer(Bet);
