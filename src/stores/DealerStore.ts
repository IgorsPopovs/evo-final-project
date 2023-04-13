import {action, makeObservable} from "mobx";
import RootStore from "./RootStore";
import {GameStatus} from "../utils/Constant";

class DealerStore {
    rootStore:RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            initDeal: action,
        });
        this.rootStore = rootStore;
    }

    initDeal():void {
        this.hit();
        this.hit();
        this.hitDealer(false);
        this.hitDealer(true);
        this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
    }

    hit ():void {
        const card = this.rootStore.deckStore.dealCard();
        if (card !== undefined) {
            // this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
            card.isHidden = false;
            this.rootStore.playersHandStore.addCard(card);
            // this.rootStore.gameStore.setStatus(GameStatus.dealersTurn);
        }
    };

    hitDealer(hidden: boolean):void {
        const card = this.rootStore.deckStore.dealCard();
        if (card !== undefined) {
            // this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
            card.isHidden = hidden;
            this.rootStore.dealersHandStore.addCard(card);
            // this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
        }
    }
}

export default DealerStore;
