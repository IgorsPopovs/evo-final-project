import React from "react";
import {observer} from "mobx-react";
import HandStore from "../stores/HandStore";
import {Text} from "@pixi/react";
import {textStyle} from "../utils/Helper";

type betProps = {
    handStore: HandStore;
};
const Bet: React.FC<betProps> = ({handStore}) => {
    // return (
    //     <div>
    //         <p> Player's bet: {handStore.betStore.getBet} </p>
    //     </div>
    // );
    return (
        <Text
            text={"Player's bet: " + handStore.betStore.getBet.toString()}
            anchor={0}
            x={0}
            y={0}
            style={textStyle}
        />
    );
}

export default observer(Bet);
