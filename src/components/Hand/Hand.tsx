import React from "react";
import {Card, CardProps} from "./Card/Card";
import {observer} from "mobx-react";
import HandStore from "../../stores/HandStore";
import './Hand.css';

type HandProps = {
    handStore: HandStore;
    owner: String;
};

const Hand: React.FC<HandProps> = ({handStore, owner}) => {
    return (
        <div className={handStore.won === undefined ? "handContainer" : handStore.won ? "handContainer green" : "handContainer red"}>
            <div>Score: {handStore.calculateScore}</div>
            <div className={"hand"}>
                {handStore.cards.length > 0 ? (
                    handStore.cards.map((card, index) => (
                        <Card key={index} value={card.value} suit={card.suit} isHidden={card.isHidden}/>
                    ))
                ) : (
                    <h2>{owner} has no cards.</h2>
                )}
            </div>
        </div>
    );
};

export default observer(Hand);