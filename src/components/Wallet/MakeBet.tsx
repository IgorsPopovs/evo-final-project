import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Chips, GameStatus} from "../../utils/Constant";
import {RootStoreContext} from "../../App";
import {autorun} from "mobx";
import "./Wallet.css";

const MakeBet: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    const handleSetBet = (amount: number) => {
        rootStore.handManagerStore.hands[0].betStore.addBet(amount);
    }

    return (
        <div className={"chips"}>
            {Chips.map((chip) => {
                return <button
                    onClick={() => {
                        handleSetBet(chip)
                    }}
                    disabled={
                        rootStore.gameStore.status !== GameStatus.playersBet ||
                        rootStore.walletStore.balance < chip
                    }
                    key={chip}
                >{chip}</button>
            })}
        </div>
    );
}

export default observer(MakeBet);