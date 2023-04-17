import HandStore from "./HandStore";
import RootStore from "./RootStore";
import {autorun, makeAutoObservable} from "mobx";
import {HandStatus} from "../utils/Constant";

class HandManagerStore {
    rootStore: RootStore;
    hands: HandStore[];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.hands = [new HandStore(this.rootStore, 0)];

        autorun(() => {
            if (this.isFinishedPlaying) {
                console.log('resultCalculated');
            }
        })
    }

    public get isDone(): boolean {
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

    private get isFinishedPlaying() {
        return (
            this.hands.filter(hand => hand.status === HandStatus.Playing).length === 0
        );
    }
}

export default HandManagerStore;