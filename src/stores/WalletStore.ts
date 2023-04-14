import {action, computed, makeObservable, observable} from "mobx";
import RootStore from "./RootStore";
import {Balance} from "../utils/Constant";

class WalletStore {
    balance: number = 0;
    rootStore: RootStore;
    bet: number = 0;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            balance: observable,
            bet: observable,
            deposit: action,
            setBalance: action,
            addBet: action,
            setBet: action,
            betPlaced: computed,
        });
        this.rootStore = rootStore;

        this.setBalance(Balance);
    }

    public get betPlaced() {
        return this.bet > 0;
    }
    public addBet(amount: number) {
        if (this.balance >= amount) {
            this.bet += amount;
            this.balance -= amount;
        }
    }

    public setBet(amount: number) {
        this.bet = amount;
    }

    public setBalance(amount: number): void {
        this.balance = amount;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }
}

export default WalletStore;