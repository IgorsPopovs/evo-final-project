import React from "react";
import {Card} from "./Card/Card";
import {observer} from "mobx-react";
import HandStore from "../../stores/HandStore";
import './Hand.css';
import {HandCombination, HandStatus} from "../../utils/Constant";
import classNames from "classnames";
import {Container, Sprite, Text} from "@pixi/react";
import {textStyle} from "../../utils/Helper";

type HandProps = {
    handStore: HandStore;
    owner: String;
};

const Hand: React.FC<HandProps> = ({handStore, owner}) => {
    // return (
    //     <div className={classNames("handContainer", {
    //             green: handStore.getStatus() === HandStatus.Win,
    //             red: handStore.getStatus() === HandStatus.Lost,
    //             yellow: handStore.getStatus() === HandStatus.Tie,
    //         }
    //     )}>
    //         <div>Score: {handStore.totalScore}</div>
    //         {owner !== 'dealer' &&
    //             <div>
    //                 <div>Status: {HandStatus[handStore.getStatus()]}</div>
    //                 <div>Combination: {HandCombination[handStore.getCombination()]}</div>
    //             </div>
    //         }
    //         <div className={"hand"}>
    //             {handStore.cards.length > 0 ? (
    //                 handStore.cards.map((card, index) => (
    //                     <Card key={index} cardStore={card}/>
    //                 ))
    //             ) : (
    //                 <h2>{owner} has no cards.</h2>
    //             )}
    //         </div>
    //     </div>
    // );

    return (
        <Container x={0} y={50}>
            {handStore.cards.length > 0 ? (
                handStore.cards.map((card, index) => (
                    <Card key={index} cardStore={card} xModifier={index}/>
                ))
            ) : (
                <Text
                    text={owner.toString()}
                    anchor={0}
                    x={0}
                    y={0}
                    style={textStyle}
                />
            )}
        </Container>
    );
};

export default observer(Hand);