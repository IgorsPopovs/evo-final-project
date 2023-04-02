import React from "react";
import {observer} from "mobx-react";
import HandStore from "../stores/HandStore";
import {Card} from "./Card";
import Hand from "./Hand";

interface IPlayerProps {
    playerStore: HandStore;
}

class Player extends React.Component<IPlayerProps> {
    //TODO: change to Hand
    render() {
        const {playerStore} = this.props;
        return (
            <div>
                <div className="hand">
                    <Hand cards={playerStore.cards} owner={"player"} />
                </div>
            </div>
        );
    }
}

export default (Player);
