import HandStore from "./HandStore";
import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";
import {HandStatus} from "../utils/Constant";

class HandActionsStore {
    rootStore: RootStore; //TODO: change to walletStore
    handStore: HandStore;

    constructor(rootStore: RootStore, handStore: HandStore) {
        this.rootStore = rootStore;
        this.handStore = handStore;

        makeAutoObservable(this, {});
    }

    public get doubleEnabled() {
        return (
            this.handStore.cards.length === 2 &&
            this.rootStore.walletStore.balance >= this.handStore.betStore.getBet &&
            this.handStore.status === HandStatus.Playing
        )
    }
}

export default HandActionsStore;