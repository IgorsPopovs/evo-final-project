import React from "react";
import { Card, CardProps } from "./Card";
import {observer} from "mobx-react";

type HandProps = {
    cards: CardProps[];
    owner: String;
};

const Hand: React.FC<HandProps> = ({ cards , owner}) => {
    return (
        <div className="hand">
            {cards.length > 0 ? (
                cards.map((card, index) => (
                <Card key={index} value={card.value} suit={card.suit} isHidden={card.isHidden} />
            ))
            ) : (
                <h2>{owner} has no cards.</h2>
            )}
        </div>
    );
};

export default observer(Hand);