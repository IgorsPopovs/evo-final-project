import HandStore from "./HandStore";
import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";
import {dispose} from "../utils/Helper";

class HandManagerStore {
    private rootStore: RootStore;
    public hands: HandStore[];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.hands = [new HandStore(this.rootStore, 1)];

        makeAutoObservable(this, {}, {autoBind: true})
    }

    public get handsLength(): number {
        return this.hands.length;
    }

    public get isDone(): boolean {
        for (let i = 0; i < this.hands.length; i++) {
            if (!this.hands[i].isDone) {
                return false;
            }
        }
        return true;
    }


    public resetAll() {
        this.hands.forEach((hand) => dispose(hand.disposers));
        this.hands = [new HandStore(this.rootStore, 1)];
    }

}

export default HandManagerStore;