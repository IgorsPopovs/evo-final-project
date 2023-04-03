import React, {useContext} from "react";
import {observer} from "mobx-react";
import Hand from "./Hand";
import {RootStoreContext} from "../App";

const Dealer: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    return (
        <div>
            <Hand handStore={rootStore.dealersHandStore} owner={"dealer"}/>
        </div>
    );
};

export default observer(Dealer);
