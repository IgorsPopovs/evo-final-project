import React from "react";
import {Card} from "./Card/Card";
import {observer} from "mobx-react";
import HandStore from "../../stores/HandStore";
import './Hand.css';
import {HandCombination, HandStatus} from "../../utils/Constant";
import classNames from "classnames";

type HandProps = {
    handStore: HandStore;
    owner: String;
};

const Hand: React.FC<HandProps> = ({handStore, owner}) => {
    return (
        <div className={classNames("handContainer", {
                green: handStore.status === HandStatus.Win,
                red: handStore.status === HandStatus.Lost,
            }
        )}>
            <div>Score: {handStore.totalScore}</div>
            {owner !== 'dealer' &&
                <div>
                    <div>Status: {HandStatus[handStore.status]}</div>
                    <div>Combination: {HandCombination[handStore.combination]}</div>
                </div>
            }
            <div className={"hand"}>
                {handStore.cards.length > 0 ? (
                    handStore.cards.map((card, index) => (
                        <Card key={index} cardStore={card}/>
                    ))
                ) : (
                    <h2>{owner} has no cards.</h2>
                )}
            </div>
        </div>
    );
};

export default observer(Hand);