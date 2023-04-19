import {makeAutoObservable} from "mobx";
import RootStore from "./RootStore";
import {Balance} from "../utils/Constant";

class WalletStore {
    private rootStore: RootStore;
    private balance: number = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.setBalance(Balance);
        makeAutoObservable(this);
    }

    public setBalance(amount: number): void {
        this.balance = amount;
    }

    public getBalance(): number {
        return this.balance;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public withdrawal(amount: number) {
        if (amount <= this.balance) {
            this.balance -= amount;
            return true;
        } else {
            return false;
        }
    }
}

export default WalletStore;