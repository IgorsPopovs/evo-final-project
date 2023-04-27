import React from 'react';
import './Card.css';
import {SuitIcons} from "../../../utils/Constant";
import CardStore from "../../../stores/CardStore";

export type CardProps = { //TODO: Create interface?
    cardStore: CardStore;
};

export const Card: React.FC<CardProps> = ({cardStore}) => {

    const suitClass = `suit-${cardStore.suit.toLowerCase()}`;
    const suitIcon = SuitIcons[cardStore.suit];
    const valueText = cardStore.value;

    return (
        <div className={`card ${suitClass} ${cardStore.isHidden ? 'hidden' : ''}`}>
            {!cardStore.isHidden && <>
                <div className="corner top-left">{valueText}</div>
                <div className="value">{suitIcon}</div>
                <div className="corner bottom-right">{valueText}</div>
            </>
            }
        </div>
    );
};

