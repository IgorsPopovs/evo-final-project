import React from "react";
import { Card, CardProps } from "./Card";

type HandProps = {
    cards: CardProps[];
};

const Hand: React.FC<HandProps> = ({ cards }) => {
    return (
        <div className="hand">
            {cards.map((card, index) => (
                <Card key={index} value={card.value} suit={card.suit} isHidden={card.isHidden} />
            ))}
        </div>
    );
};

export default Hand;