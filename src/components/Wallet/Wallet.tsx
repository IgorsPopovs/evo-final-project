import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Chips, GameStatus} from "../../utils/Constant";
import {RootStoreContext} from "../../App";
import BetMaker from "./BetMaker/BetMaker";
import BetTimer from "./BetTimer";
import {Container, Text} from "@pixi/react";
import {textStyle} from "../../utils/Helper";

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

    // return (
    //         <div className='wallet-controls'>
    //             {rootStore.gameStore.getStatus() === GameStatus.playersBet &&
    //                 <BetTimer onTimeout={handleTimeout} />
    //             }
    //             {rootStore.gameStore.getStatus() === GameStatus.playersBet &&
    //                 <BetMaker/>
    //             }
    //             <p>Wallet balance: {rootStore.walletStore.getBalance()}</p>
    //         </div>
    // );
    return (
        <Container x={-500} y={-400}>
            <Container x={0} y={0}>
            {rootStore.gameStore.getStatus() === GameStatus.playersBet &&
                <BetTimer onTimeout={handleTimeout}/>
            }
            </Container>
            <Container x={0} y={100}>
            {rootStore.gameStore.getStatus() === GameStatus.playersBet &&
                <BetMaker/>
            }
            </Container>
            <Container y={-100}>
            <Text
                text={"Wallet balance: " + rootStore.walletStore.getBalance()}
                anchor={0}
                x={0}
                y={0}
                style={textStyle}
            />
            </Container>
        </Container>
    )
}

export default observer(Wallet);