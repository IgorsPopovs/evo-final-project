import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Chips, GameStatus} from "../../utils/Constant";
import {RootStoreContext} from "../../App";
import BetMaker from "./BetMaker/BetMaker";
import BetTimer from "./BetTimer";

const Wallet: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    const handleTimeout = () => {
        rootStore.handManagerStore.hands.forEach((hand) => {
            if (hand.betStore.getBet === 0) {
                hand.betStore.addBet(Chips[0]);
            }
        })

        rootStore.gameStore.setStatus(GameStatus.initialDeal);
        // rootStore.dealerStore.initDeal();
        console.log('Betting timer has ended');
    };

    return (
            <div className='wallet-controls'>
                {rootStore.gameStore.status === GameStatus.playersBet &&
                    <BetTimer onTimeout={handleTimeout} />
                }
                {rootStore.gameStore.status === GameStatus.playersBet &&
                    <BetMaker/>
                }
                <p>Wallet balance: {rootStore.walletStore.balance}</p>
            </div>
    );
}

export default observer(Wallet);