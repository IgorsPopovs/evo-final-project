import React from "react";
import {observer} from "mobx-react";
import HandStore from "../stores/HandStore";
import Hand from "./Hand";

interface IDealerProps {
    handStore: HandStore;
}

const Dealer: React.FC<IDealerProps> = ({ handStore }) => {
    return (
        <div>
            <Hand handStore={handStore} owner={"dealer"}/>
        </div>
    );
};

export default observer(Dealer);
