import React, {useContext} from "react";
import {observer} from "mobx-react";
import Hand from "../Hand/Hand";
import {RootStoreContext} from "../../App";
import PlayerName from "./PlayerName/PlayerName";

const Dealer: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    return (
        <div className={"player-container"} id={"dealer-container"}>
            <PlayerName name={"DEALER"}/>
            <Hand handStore={rootStore.dealersHandStore} owner={"dealer"}/>
        </div>
    );
};

export default observer(Dealer);
