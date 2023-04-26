import React from "react";
import {Card} from "./Card/Card";
import {observer} from "mobx-react";
import HandStore from "../../stores/HandStore";
import './Hand.css';
import {HandStatus} from "../../utils/Constant";
import classNames from "classnames";
import {BlankCard} from "./Card/BlankCard";
import Combination from "./Combination";
import TotalScore from "./TotalScore/TotalScore";

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
            <Combination handStore={handStore} owner={owner}/>
            <div className={"hand"} id={"hand-" + handStore.id}>
                <TotalScore key={handStore.totalScore} handStore={handStore}/>
                {handStore.cards.length > 0 ? (
                    handStore.cards.map((card, index) => (
                        <Card key={index} cardStore={card}/>
                    ))
                ) : (
                    <></>
                )}
                {handStore.getShowBlankCard() &&
                    <BlankCard visible={false}/>
                }
            </div>
        </div>
    );
};

export default observer(Hand);