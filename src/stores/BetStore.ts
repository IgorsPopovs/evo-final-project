import {action, computed, makeObservable, observable} from "mobx";
import RootStore from "./RootStore";
import {Balance} from "../utils/Constant";

class BetStore {
    // balance: number = 0;
    rootStore: RootStore;
    bet: number = 0;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            // balance: observable,
            bet: observable,
            // deposit: action,
            // setBalance: action,
            addBet: action,
            setBet: action,
            getBet: computed,
            betPlaced: computed,
        });
        this.rootStore = rootStore;
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