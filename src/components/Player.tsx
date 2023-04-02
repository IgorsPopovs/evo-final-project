import React from "react";
import {observer} from "mobx-react";
import HandStore from "../stores/HandStore";
import {Card} from "./Card";
import Hand from "./Hand";

interface IPlayerProps {
    handStore: HandStore;
}

class Player extends React.Component<IPlayerProps> {
    render() {
        const {handStore} = this.props;
        return (
            <div>
                <div className="hand">
                    <Hand cards={handStore.cards} owner={"player"} />
                </div>
            </div>
        );
    }
}

export default (Player);
