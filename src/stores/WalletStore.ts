import {makeAutoObservable} from "mobx";
import RootStore from "./RootStore";
import {Balance} from "../utils/Constant";

class WalletStore {
    balance: number = 0;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.setBalance(Balance);
        makeAutoObservable(this);
    }

    public setBalance(amount: number): void {
        this.balance = amount;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }
}

export default WalletStore;