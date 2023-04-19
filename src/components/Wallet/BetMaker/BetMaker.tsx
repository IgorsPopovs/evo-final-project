import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Chips, GameStatus} from "../../../utils/Constant";
import {RootStoreContext} from "../../../App";
import "../Wallet.css";
import "./BetMaker.css";
import classNames from "classnames";

const BetMaker: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    const handleSetBet = (amount: number) => {
        rootStore.handManagerStore.hands[0].betStore.addBet(amount);
    }

    return (
        <div className={"chips-container"}>
            {Chips.map((chip) => {
                return <div className={"chip-outer"} key={chip}>
                    <button
                        className={classNames("chip", {[`chip-${chip}`]: true})}
                        onClick={() => {
                            handleSetBet(chip)
                        }}
                        disabled={
                            rootStore.gameStore.status !== GameStatus.playersBet ||
                            rootStore.walletStore.getBalance() < chip
                        }
                        key={chip}
                    ><span>{chip}</span></button>
                </div>
            })}
        </div>
    )
        ;
}

export default observer(BetMaker);