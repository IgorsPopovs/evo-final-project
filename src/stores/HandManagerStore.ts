import HandStore from "./HandStore";
import RootStore from "./RootStore";
import {autorun, computed, makeAutoObservable} from "mobx";
import {HandStatus} from "../utils/Constant";
import {dispose} from "../utils/Helper";

class HandManagerStore {
    rootStore: RootStore;
    hands: HandStore[];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.hands = [new HandStore(this.rootStore)];

        makeAutoObservable(this, {
            isDone: computed,
        });

        autorun(() => {
            if (this.isFinishedPlaying) {
                console.log('resultCalculated');
            }
        })

    }

    public get handsLength(): number {
        return this.hands.length;
    }

    public get isDone(): boolean {
        for (let i = 0; i < this.hands.length; i++) {
            console.log(!this.hands[i].isDone);
            if (!this.hands[i].isDone) {
                return false;
            }
        }
        return true;
    }


    public resetAll() {
        this.hands.forEach((hand) => dispose(hand.disposers));
        this.hands = [new HandStore(this.rootStore)];
    }

    private get isFinishedPlaying() {
        return (
            this.hands.filter(hand => hand.status === HandStatus.Playing).length === 0
        );
    }
}

export default HandManagerStore;