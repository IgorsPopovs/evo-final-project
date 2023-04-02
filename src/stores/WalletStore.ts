import {action, computed, makeObservable, observable} from "mobx";
import RootStore from "./RootStore";
import rootStore from "./RootStore";

class WalletStore {
    balance: number = 0;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            balance: observable,
            withdraw: action,
            deposit: action,
            setBalance: action,
        });
        this.rootStore = rootStore;
    }

    public setBalance(amount: number): void {
        this.balance = amount;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public withdraw(amount: number): void {
        if (amount > this.balance) {
            throw new Error("Insufficient balance.");
        }
        this.balance -= amount;
    }
}

export default WalletStore;