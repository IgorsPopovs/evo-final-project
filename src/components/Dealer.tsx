import React from "react";
import {observer} from "mobx-react";
import HandStore from "../stores/HandStore";
import {Card} from "./Card";
import Hand from "./Hand";

interface IDealerProps {
    handStore: HandStore;
}

class Dealer extends React.Component<IDealerProps> {
    render() {
        const {handStore} = this.props;
        return (
            <div>
                <Hand handStore={handStore} owner={"dealer"}/>
            </div>
        );
    }
}

export default (Dealer);
