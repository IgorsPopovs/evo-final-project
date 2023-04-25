import React, {useState} from "react";
import {Card} from "./Card/Card";
import {observer} from "mobx-react";
import HandStore from "../../stores/HandStore";
import './Hand.css';
import {HandCombination, HandStatus} from "../../utils/Constant";
import classNames from "classnames";
import {BlankCard} from "./Card/BlankCard";

type HandProps = {
    handStore: HandStore;
    owner: String;
};

const Hand: React.FC<HandProps> = ({handStore, owner}) => {
    return (
        <div className={classNames("handContainer", {
                green: handStore.getStatus() === HandStatus.Win,
                red: handStore.getStatus() === HandStatus.Lost,
                yellow: handStore.getStatus() === HandStatus.Tie,
            }
        )}>
            <div>Score: {handStore.totalScore}</div>
            {owner !== 'dealer' &&
                <div>
                    <div>Status: {HandStatus[handStore.getStatus()]}</div>
                    <div>Combination: {HandCombination[handStore.getCombination()]}</div>
                </div>
            }
            <div className={"hand"} id={"hand-" + handStore.id}>
                {handStore.cards.length > 0 ? (
                    handStore.cards.map((card, index) => (
                        <Card key={index} cardStore={card}/>
                    ))
                ) : (
                    <></>
                )}
                {handStore.showBlankCard &&
                    <BlankCard visible={false}/>
                }
            </div>
        </div>
    );
};

export default observer(Hand);