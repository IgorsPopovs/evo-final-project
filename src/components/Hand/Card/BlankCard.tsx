import React from 'react';
import './Card.css';
import {SuitIcons} from "../../../utils/Constant";
import CardStore from "../../../stores/CardStore";


type BlankCardProps = {
    visible: boolean
}
export const BlankCard: React.FC<BlankCardProps> = ({visible}) => {
    return (
        <div id="blank-card" className={`card ${visible ? 'hidden' : 'blank'}`}>
            <div className="corner top-left"></div>
            <div className="value"></div>
            <div className="corner bottom-right"></div>
        </div>
    );
};

