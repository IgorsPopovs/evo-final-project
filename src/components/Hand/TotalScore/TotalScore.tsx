import React, {useState} from "react";
import {observer} from "mobx-react";
import HandStore from "../../../stores/HandStore";
import "./TotalScore.css";

type HandProps = {
    handStore: HandStore;
};

const TotalScore: React.FC<HandProps> = ({handStore}) => {
    return (
        <>
            {handStore.totalScore > 0 &&
                <div className="score">
                    <p>{handStore.totalScore}</p>
                </div>
            }
        </>
    );
};

export default observer(TotalScore);