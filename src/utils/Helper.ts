import {Value} from "./Constant";
import {IReactionDisposer} from "mobx";
import {TextStyle} from "pixi.js";
import {stageParams} from "./Parameters";

export const dispose = (disposers: IReactionDisposer[]): IReactionDisposer[] => {
    disposers.forEach((disposer) => disposer());
    return [];
}

export const getCardScore = (sum: number, value: Value): number => {
    switch (value) {
        case 'A':
            return 11;
        case 'J':
            return 10;
        case 'Q':
            return 10;
        case 'K':
            return 10;
        default:
            return Number(value);
    }
}

export const textStyle = new TextStyle({
    // align: "center",
    // fontWeight: "bold",
    fontSize: stageParams.height/40,
    fill: ["#ffffff", "#808080"],
    // stroke: "#eef1f5",
    // strokeThickness: 1,
    letterSpacing: 1,
    wordWrap: false,
    wordWrapWidth: 350
})