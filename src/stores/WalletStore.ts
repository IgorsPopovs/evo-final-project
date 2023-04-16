import {action, computed, makeObservable, observable} from "mobx";
import RootStore from "./RootStore";
import {Balance} from "../utils/Constant";

class WalletStore {
    balance: number = 0;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            balance: observable,
            deposit: action,
            setBalance: action,
        });
        this.rootStore = rootStore;

        this.setBalance(Balance);
    }

    public setBalance(amount: number): void {
        this.balance = amount;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }
}

export default WalletStore;