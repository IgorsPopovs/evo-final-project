import {makeAutoObservable} from "mobx";
import RootStore from "./RootStore";

class BetStore {
    rootStore: RootStore; //TODO: Change to walletStore
    private bet: number = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    public get betPlaced() {
        return this.bet > 0;
    }

    public addBet(amount: number) {
        if (this.rootStore.walletStore.balance >= amount) {
            this.bet += amount;
            this.rootStore.walletStore.balance -= amount;
        }
    }

    public setBet(amount: number) {
        this.bet = amount;
    }

    public get getBet() {
        return this.bet;
    }
}

export default BetStore;