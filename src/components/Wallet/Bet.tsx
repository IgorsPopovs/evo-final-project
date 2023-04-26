import React from "react";
import {observer} from "mobx-react";
import HandStore from "../../stores/HandStore";

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
