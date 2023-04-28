import React, {useContext} from "react";
import {observer} from "mobx-react";
import Hand from "../Hand/Hand";
import {RootStoreContext} from "../../App";
import PlayerName from "./PlayerName/PlayerName";
import {GameStatus} from "../../utils/Constant";

const Dealer: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    return (
        <div className={"player-container"} id={"dealer-container"}>
            <PlayerName name={"DEALER"}/>
            <div className={"player-hands-container"}>
                <div className={"hand-container"}>
                    <Hand handStore={rootStore.dealersHandStore} owner={"dealer"}/>
                </div>
            </div>
        </div>
    );
};

export default observer(Dealer);
