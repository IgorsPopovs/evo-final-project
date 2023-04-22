import React, {useContext} from "react";
import Hand from "../Hand/Hand";
import Wallet from "../Wallet/Wallet";
import {RootStoreContext} from "../../App";
import HandActions from "../Hand/HandActions";
import Bet from "../Bet";
import "./Player.css";
import {observer} from "mobx-react";
import {Container} from "@pixi/react";
import {cardParams} from "../../utils/Parameters";

const Player: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    // return (
    //     <div className={"player-container"}>
    //         <h2>PLAYER</h2>
    //         <div className={"player-hands-container"}>
    //             {rootStore.handManagerStore.hands.map((hand,i) => {
    //                 return (<div key={i} >
    //                     <Hand handStore={hand} owner={"player"}/>
    //                     <Bet handStore={hand}></Bet>
    //                     <HandActions handStore={hand}/>
    //                 </div>);
    //             })}
    //         </div>
    //         <Wallet/>
    //     </div>
    // );

    return (
        <Container>
            {rootStore.handManagerStore.hands.map((hand, i) => {
                return (<Container key={i} x={cardParams.width * i*hand.cards.length + i*50}>
                    <Hand handStore={hand} owner={"player"}/>
                    <Bet handStore={hand}></Bet>
                    <HandActions handStore={hand}/>
                </Container>);
            })}
            <Wallet/>
        </Container>
    )
}

export default observer(Player);
