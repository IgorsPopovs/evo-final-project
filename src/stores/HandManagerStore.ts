import HandStore from "./HandStore";
import RootStore from "./RootStore";
import {autorun, makeAutoObservable} from "mobx";

class HandManagerStore {
    rootStore: RootStore;
    hands: HandStore[];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.hands = [new HandStore(this.rootStore, 0)];

        autorun(() => {
            if (this.isResultsCalculated) {
                console.log('resultCalculated');
            }
        })
    }

    get isDone(): boolean {
        // this.hands.forEach((hand) => {
        for (let i = 0; i < this.hands.length; i++) {
            console.log(!this.hands[i].isDone);
            if (!this.hands[i].isDone) {
                return false;
            }
        }
        return true;
    }


    public resetAll() {
        this.hands = [new HandStore(this.rootStore, 0)];
    }

    get isResultsCalculated() {
        return (this.hands.filter(hand => hand.won === undefined).length === 0);
    }
}

export default HandManagerStore;