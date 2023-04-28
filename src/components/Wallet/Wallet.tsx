import React, {useContext} from "react";
import {observer} from "mobx-react";
import {currencySign, GameStatus} from "../../utils/Constant";
import {RootStoreContext} from "../../App";
import BetMaker from "./BetMaker/BetMaker";
import BetTimer from "./BetTimer/BetTimer";

const Wallet: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    const handleTimeout = () => {
        let startGame = true;
        rootStore.handManagerStore.hands.forEach((hand) => {
            if (hand.betStore.getBet === 0) {
                startGame = false;
            }
        })
        if (startGame) {
            rootStore.gameStore.setStatus(GameStatus.initialDeal);
        } else {
            rootStore.gameStore.setStatus(GameStatus.init, 500).then(r =>
                rootStore.gameStore.setStatus(GameStatus.playersBet));

        }

    };

    return (
        <div className='wallet-controls'>
            {rootStore.gameStore.getStatus() === GameStatus.playersBet &&
                <BetTimer onTimeout={handleTimeout}/>
            }
            {rootStore.gameStore.getStatus() === GameStatus.playersBet &&
                <BetMaker/>
            }
            <p className={rootStore.gameStore.getStatus() !== GameStatus.playersBet ? 'balance-bottom' : ''}>balance: {rootStore.walletStore.getBalance() + currencySign}</p>
        </div>
    );
}

export default observer(Wallet);