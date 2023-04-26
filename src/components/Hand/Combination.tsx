import React from "react";
import {observer} from "mobx-react";
import HandStore from "../../stores/HandStore";
import './Hand.css';
import {HandCombination} from "../../utils/Constant";

type HandProps = {
    handStore: HandStore;
    owner: String;
};

const Combination: React.FC<HandProps> = ({handStore, owner}) => {
    return (
        <div>
            {owner !== 'dealer' && handStore.getCombination() !== HandCombination.None &&
                <div>Combination: {HandCombination[handStore.getCombination()]}</div>
            }
        </div>
    );
};

export default observer(Combination);