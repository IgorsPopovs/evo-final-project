import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {RootStoreContext} from "../../App";
import {GameStatus} from "../../utils/Constant";
import HandStore from "../../stores/HandStore";
import {Container, Sprite, Text} from "@pixi/react";
import {textStyle} from "../../utils/Helper";

type ButtonProps = {
    valueText: string;
    clickAction: () => void;
    offset: number;
}

const Button: React.FC<ButtonProps> = ({valueText, clickAction, offset}) => {
    return (
        <Container>
            <Sprite
                x={150*offset}
                y={0}
                height={50}
                width={150}
                anchor={0.5}
                interactive={true}
                image={require("../../images/button.png")}
                pointerdown={
                    clickAction
                }
            />
            <Text
                text={valueText}
                anchor={0.5}
                x={150*offset}
                y={0}
                style={textStyle}
            />
        </Container>
    );
};

export default observer(Button);