import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {Container, Sprite, Text} from "@pixi/react";
import {textStyle} from "../../../utils/Helper";
import {chipParams} from "../../../utils/Parameters";

type ButtonProps = {
    valueText: string;
    clickAction: () => void;
    offset: number;
}

const Chip: React.FC<ButtonProps> = ({valueText, clickAction, offset}) => {
    return (
        <Container>
            <Sprite
                x={chipParams.diameter}
                y={chipParams.diameter * offset}
                height={chipParams.diameter}
                width={chipParams.diameter}
                anchor={0.5}
                interactive={true}
                image={require("../../../images/button.png")}
                pointerdown={
                    clickAction
                }
            />
            <Text
                text={valueText}
                anchor={0.5}
                x={chipParams.diameter}
                y={chipParams.diameter * offset}
                style={textStyle}
            />
        </Container>
    );
};

export default observer(Chip);