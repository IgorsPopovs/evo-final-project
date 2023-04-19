import {makeAutoObservable} from "mobx";
import RootStore from "./RootStore";

class BetStore {
    private rootStore: RootStore;
    private bet: number = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    public get betPlaced() {
        return this.bet > 0;
    }

    public addBet(amount: number) {
        if (this.rootStore.walletStore.withdrawal(amount)) {
            this.bet += amount;
        } else {
            console.log('Not enough money');
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