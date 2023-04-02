import { makeAutoObservable } from "mobx";
import DeckStore from "./DeckStore";
import HandStore from "./HandStore";
import WalletStore from "./WalletStore";

class RootStore {
    deckStore: DeckStore;
    playersHandStore: HandStore;
    dealersHandStore: HandStore;
    walletStore: WalletStore;

    constructor() {
        this.deckStore = new DeckStore(this);
        this.playersHandStore = new HandStore(this);
        this.dealersHandStore = new HandStore(this);
        this.walletStore = new WalletStore(this);
    }
}

export default RootStore;