import React from "react";
import {Card} from "./Card/Card";
import {observer} from "mobx-react";
import HandStore from "../../stores/HandStore";
import './Hand.css';
import './Combination/Combination.css';
import {HandStatus} from "../../utils/Constant";
import classNames from "classnames";
import {BlankCard} from "./Card/BlankCard";
import Combination from "./Combination/Combination";
import TotalScore from "./TotalScore/TotalScore";

type HandProps = {
    handStore: HandStore;
    owner: String;
};

const Hand: React.FC<HandProps> = ({handStore, owner}) => {
    return (
        <div className={classNames("handContainer", {
                green: handStore.getStatus() === HandStatus.Won,
                red: handStore.getStatus() === HandStatus.Lost,
                yellow: handStore.getStatus() === HandStatus.Tie,
            }
        )}>
            <div className={"hand"} id={"hand-" + handStore.id}>
                <TotalScore key={handStore.totalScore} handStore={handStore}/>
                {handStore.cards.length > 0 ? (
                    handStore.cards.map((card, index) => (
                        <Card key={index} cardStore={card}/>
                    ))
                ) : (
                    <></>
                )}
                <Combination
                    key={handStore.id + "-" + handStore.getCombination()}
                    handStore={handStore}
                    owner={owner}
                />
                {handStore.getShowBlankCard() &&
                    <BlankCard visible={false}/>
                }
            </div>
        </div>
    );
};

export default observer(Hand);