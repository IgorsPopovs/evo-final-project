import React from 'react';
import '../css/Card.css';
import {Suit, Value, SuitIcons} from "../utils/Constant";

export type CardProps = { //TODO: Create interface?
    suit: Suit;
    value: Value;
    isHidden: boolean;
};

export const Card: React.FC<CardProps> = ({value, suit, isHidden = false}) => {

    const suitClass = `suit-${suit.toLowerCase()}`;
    const suitIcon = SuitIcons[suit];
    const valueText = value;

    return (
        <div className={`card ${suitClass} ${isHidden ? 'hidden' : ''}`}>
            <div className="corner top-left">{valueText}</div>
            <div className="value">{suitIcon}</div>
            <div className="corner bottom-right">{valueText}</div>
        </div>
    );
};
