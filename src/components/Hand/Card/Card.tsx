import React from 'react';
import './Card.css';
import {SuitIcons} from "../../../utils/Constant";
import CardStore from "../../../stores/CardStore";
import {Container, PixiComponent, Sprite, Text} from "@pixi/react";
import {Graphics, TextStyle} from "pixi.js";
import {textStyle} from "../../../utils/Helper";
import {cardParams, stageParams} from "../../../utils/Parameters";

export type CardProps = { //TODO: Create interface?
    cardStore: CardStore;
    xModifier: number;
};

interface RectangleProps {
    x: number
    y: number
    width: number
    height: number
    color: number
}

export const Card: React.FC<CardProps> = ({cardStore, xModifier}) => {

    const suitClass = `suit-${cardStore.suit.toLowerCase()}`;
    const suitIcon = SuitIcons[cardStore.suit];
    const valueText = cardStore.value;

    // return (
    //     <div className={`card ${suitClass} ${cardStore.isHidden ? 'hidden' : ''}`}>
    //         <div className="corner top-left">{valueText}</div>
    //         <div className="value">{suitIcon}</div>
    //         <div className="corner bottom-right">{valueText}</div>
    //     </div>
    // );


    const Rectangle = PixiComponent<RectangleProps, Graphics>('Rectangle', {
        create: () => new Graphics(),
        applyProps: (ins, _, props) => {
            ins.x = props.x
            ins.beginFill(props.color)
            ins.drawRect(props.x, props.y, props.width, props.height)
            ins.endFill()
        },
    })

    const cardTextStyle = new TextStyle({
        // align: "center",
        // fontWeight: "bold",
        fontSize: cardParams.height/5,
        fill: ["#ffffff", "#808080"],
        // stroke: "#eef1f5",
        // strokeThickness: 1,
        letterSpacing: 1,
        wordWrap: false,
        wordWrapWidth: 350
    })

    const height = cardParams.height;
    const width = cardParams.width;
    return (
        <Container x={xModifier * width} y={0}>
            {cardStore.isHidden ? (
                <Sprite
                    image={require("../../../images/card-back-black.png")}
                    height={height}
                    width={width}
                />
            ) : (
                <Container>
                    <Rectangle
                        x={0}
                        y={0}
                        width={cardParams.width}
                        height={cardParams.height}
                        color={0x00F0FBFF}/>
                    <Text
                        text={valueText}
                        anchor={0}
                        x={0}
                        y={0}
                        style={cardTextStyle}
                    />
                    <Text
                        text={suitIcon}
                        anchor={0.5}
                        x={width / 2}
                        y={height / 2}
                        style={cardTextStyle}
                    />
                    <Text
                        text={valueText}
                        anchor={1}
                        x={width}
                        y={height}
                        style={cardTextStyle}
                    />
                </Container>
            )}


        </Container>
    );
};

