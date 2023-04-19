import HandStore from "./HandStore";
import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";
import {HandCombination, HandStatus} from "../utils/Constant";

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
            this.handStore.getStatus() === HandStatus.Playing
        )
    }

    public get splitEnabled() {
        return (this.handStore.getCombination() === HandCombination.Split);
    }
}

export default HandActionsStore;