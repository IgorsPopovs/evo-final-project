import React, {useContext} from "react";
import {observer} from "mobx-react";
import Hand from "../Hand/Hand";
import {RootStoreContext} from "../../App";

const Dealer: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    return (
        <div className={"player-container"} id={"dealer-container"}>
            <h2>DEALER</h2>
            <Hand handStore={rootStore.dealersHandStore} owner={"dealer"}/>
        </div>
    );
};

export default observer(Dealer);
