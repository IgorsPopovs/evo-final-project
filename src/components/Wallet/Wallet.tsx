import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Chips, GameStatus} from "../../utils/Constant";
import {RootStoreContext} from "../../App";
import BetMaker from "./BetMaker/BetMaker";
import BetTimer from "./BetTimer/BetTimer";

const Wallet: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    const handleTimeout = () => {
        rootStore.handManagerStore.hands.forEach((hand) => {
            if (hand.betStore.getBet === 0) {
                hand.betStore.addBet(Chips[0]);
            }
        })

        rootStore.gameStore.setStatus(GameStatus.initialDeal);
    };

    return (
            <div className='wallet-controls'>
                {rootStore.gameStore.getStatus() === GameStatus.playersBet &&
                    <BetTimer onTimeout={handleTimeout} />
                }
                {rootStore.gameStore.getStatus() === GameStatus.playersBet &&
                    <BetMaker/>
                }
                <p>balance: {rootStore.walletStore.getBalance()}</p>
            </div>
    );
}

export default observer(Wallet);