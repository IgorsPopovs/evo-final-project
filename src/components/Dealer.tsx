import React, {useContext} from "react";
import {observer} from "mobx-react";
import Hand from "./Hand";
import {RootStoreContext} from "../App";
import {autorun} from "mobx";
import {GameStatus} from "../utils/Constant";

const Dealer: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    autorun(() => {
        if (
            rootStore.gameStore.status === GameStatus.dealersTurn &&
            !rootStore.dealersHandStore.isDone
        ) {
            const card = rootStore.deckStore.dealCard();
            if (card !== undefined) {
                if (
                    rootStore.dealersHandStore.calculateScore >= 17 ||
                    rootStore.dealersHandStore.calculateScore > rootStore.playersHandStore.calculateScore ||
                    rootStore.playersHandStore.calculateScore > 21
                ) {
                    rootStore.dealersHandStore.setDone();
                    console.log('setting done')
                } else {
                    rootStore.dealersHandStore.addCard(card);
                }
            }

        }

    })

    return (
        <div>
            <Hand handStore={rootStore.dealersHandStore} owner={"dealer"}/>
        </div>
    );
};

export default observer(Dealer);
