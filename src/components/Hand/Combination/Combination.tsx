import React from "react";
import {observer} from "mobx-react";
import HandStore from "../../../stores/HandStore";
import "./Combination.css";
import {HandCombination} from "../../../utils/Constant";

type HandProps = {
    handStore: HandStore;
    owner: String;
};

const Combination: React.FC<HandProps> = ({handStore, owner}) => {
    return (
        <>
            {
                (owner === 'player' && handStore.getCombination() !== HandCombination.None) &&
                <div className={`combination combo-${HandCombination[handStore.getCombination()]}`} />
            }
        </>
    );
};

export default observer(Combination);