import {GameStatus} from "../utils/Constant";
import RootStore from "./RootStore";
import {action, autorun, makeObservable, observable} from "mobx";

// interface IGameStore {
//     status: GameStatus,
// }

class GameStore {
    rootStore: RootStore;
    status:GameStatus = GameStatus.init;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            status: observable,
            setStatus: action,
        })
        this.rootStore = rootStore;
    }

    setStatus(newStatus:GameStatus) {
        this.status = newStatus;
    }

}


export default GameStore;