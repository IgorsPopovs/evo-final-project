import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {RootStoreContext} from "../../App";
import {GameStatus} from "../../utils/Constant";
import HandStore from "../../stores/HandStore";
import {Container, Sprite} from "@pixi/react";
import Button from "./Button";
import {cardParams} from "../../utils/Parameters";

type HandActionsProps = {
    handStore: HandStore;
}

const HandActions: React.FC<HandActionsProps> = ({handStore}) => {
    const {
        gameStore,
        dealerStore,
        dealersHandStore,
        handManagerStore,
        deckStore
    } = useContext(RootStoreContext);

    const bunny = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png";

    const handleReset = () => {
        console.log("Resetting...");
        gameStore.setStatus(GameStatus.playersBet);
        dealersHandStore.reset();
        //rootStore.playersHandStore.reset();
        handManagerStore.resetAll();
        deckStore.createDeck();
        deckStore.shuffle();
    }

    // return (
    //     <div>
    //         <div>
    //             <button
    //                 disabled={!handStore.handActionsStore.doubleEnabled}
    //                 onClick={() => dealerStore.double(handStore)}
    //             >
    //                 Double
    //             </button>
    //             <button
    //                 disabled={
    //                     handStore.isDone ||
    //                     gameStore.getStatus() !== GameStatus.playersTurn
    //                 }
    //                 onClick={() => dealerStore.hit(handStore, false)}
    //             >
    //                 Hit
    //             </button>
    //             <button
    //                 disabled={
    //                     !(!handStore.isDone &&
    //                         gameStore.getStatus() === GameStatus.playersTurn)
    //                 }
    //                 onClick={() => handStore.setDone()}
    //             >
    //                 Stay
    //             </button>
    //             <button
    //                 disabled={!handStore.handActionsStore.splitEnabled}
    //                 onClick={() => handStore.splitHand()}
    //             >
    //                 Split
    //             </button>
    //             <button
    //                 onClick={() => handleReset()}
    //             >
    //                 Reset
    //             </button>
    //         </div>
    //     </div>
    // );

    const buttons = [
        {
            valueText: "Double",
            clickAction: () => dealerStore.double(handStore),
            active: (handStore.handActionsStore.doubleEnabled),
        },
        {
            valueText: "Hit",
            clickAction: () => dealerStore.hit(handStore, false),
            active: (!handStore.isDone && gameStore.getStatus() === GameStatus.playersTurn),
        },
        {
            valueText: "Stay",
            clickAction: () => handStore.setDone(),
            active: (!handStore.isDone && gameStore.getStatus() === GameStatus.playersTurn),
        },
        {
            valueText: "Split",
            clickAction: () => handStore.splitHand(),
            active: (handStore.handActionsStore.splitEnabled),
        },
    ]


    return (
        <Container y={50 + cardParams.height + 20}>
            {buttons.map((button, index) => {
                if (button.active)
                    return <Button
                        key={index}
                        valueText={button.valueText}
                        clickAction={button.clickAction}
                        offset={index}
                    />
            })}
        </Container>
    );
};

export default observer(HandActions);