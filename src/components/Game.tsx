import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {RootStoreContext} from "../App";
import {GameStatus, Users} from "../utils/Constant";

const Game: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    // useEffect(() => {
    //     return () => {
    //         rootStore.gameStore.dispose();
    //     };
    // }, []);

    const handleHit = () => {
        rootStore.dealerStore.hit(Users.Player, false);
    };

    const handleStay = () => {
        rootStore.playersHandStore.setDone();
    }

    const handleReset = () => {
        console.log("Resetting...");
        rootStore.gameStore.setStatus(GameStatus.playersBet);
        rootStore.dealersHandStore.reset();
        rootStore.playersHandStore.reset();
        rootStore.deckStore.createDeck();
        rootStore.deckStore.shuffle();
    }

    return (
        <div>
            <div>
                {/*<p> Player isDone: {rootStore.playersHandStore.isDone ? ('Yes') : ('No')} </p>*/}
                <p> Game status: {rootStore.gameStore.status} </p>
            </div>
            <div>
                <button
                    disabled={
                        rootStore.playersHandStore.isDone ||
                        rootStore.gameStore.status !== GameStatus.playersTurn
                    }
                    onClick={() => handleHit()}
                >Hit
                </button>
                <button
                    disabled={
                        !(!rootStore.playersHandStore.isDone &&
                            rootStore.gameStore.status === GameStatus.playersTurn)
                    }
                    onClick={() => handleStay()}
                >
                    Stay
                </button>
                <button
                    onClick={() => handleReset()}
                >
                    reset
                </button>
                {/*<button*/}
                {/*    disabled={*/}
                {/*        rootStore.dealersHandStore.isDone === true*/}
                {/*    }*/}
                {/*    onClick={() => handleDealCard('dealer')}*/}
                {/*>Deal to Dealer*/}
                {/*</button>*/}
                {/*<button onClick={() => handleShuffle()}>Shuffle</button>*/}

            </div>
        </div>
    );
}

export default observer(Game);