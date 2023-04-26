import HandStore from "./HandStore";
import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";
import {GameStatus, HandCombination, HandStatus} from "../utils/Constant";

class HandActionsStore {
    private rootStore: RootStore;
    private handStore: HandStore;

    constructor(rootStore: RootStore, handStore: HandStore) {
        this.rootStore = rootStore;
        this.handStore = handStore;

        makeAutoObservable(this, {});
    }

    public get doubleEnabled() {
        return (
            this.handStore.cards.length === 2 &&
            this.rootStore.walletStore.getBalance() >= this.handStore.betStore.getBet &&
            this.commonCondition()
        )
    }

    public get splitEnabled() {
        return (
            this.handStore.getCombination() === HandCombination.Split &&
            this.commonCondition()
        );
    }

    public get hitEnabled() {
        return (
            this.commonCondition()
        );
    }

    public get stayEnabled() {
        return (
            this.commonCondition()
        );
    }

    private commonCondition() {
        return (
            !this.handStore.isDone &&
            this.rootStore.gameStore.getStatus() === GameStatus.playersTurn &&
            this.handStore.getStatus() === HandStatus.Playing &&
            !this.rootStore.deckStore.isDealingAnimation
        );
    }
}

export default HandActionsStore;