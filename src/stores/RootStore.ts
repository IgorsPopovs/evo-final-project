import { makeAutoObservable } from "mobx";
import DeckStore from "./DeckStore";
import HandStore from "./HandStore";
import WalletStore from "./WalletStore";
import GameStore from "./GameStore";
import DealerStore from "./DealerStore";
import HandManagerStore from "./HandManagerStore";
import BetStore from "./BetStore";

class RootStore {
    deckStore: DeckStore;
    dealerStore: DealerStore;
    handManagerStore: HandManagerStore;
    // playersHandStore: HandStore;
    dealersHandStore: HandStore;
    walletStore: WalletStore;
    gameStore: GameStore;

    constructor() {
        this.gameStore = new GameStore(this);
        this.handManagerStore = new HandManagerStore(this);
        this.deckStore = new DeckStore(this);
        this.dealerStore = new DealerStore(this);

        // this.playersHandStore = new HandStore(this);
        this.dealersHandStore = new HandStore(this, 0);
        this.walletStore = new WalletStore(this);
    }
}

export default RootStore;
