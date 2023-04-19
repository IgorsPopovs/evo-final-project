import DeckStore from "./DeckStore";
import HandStore from "./HandStore";
import WalletStore from "./WalletStore";
import GameStore from "./GameStore";
import DealerStore from "./DealerStore";
import HandManagerStore from "./HandManagerStore";

class RootStore {
    public deckStore: DeckStore;
    public dealerStore: DealerStore;
    public handManagerStore: HandManagerStore;
    public dealersHandStore: HandStore;
    public walletStore: WalletStore;
    public gameStore: GameStore;

    constructor() {
        this.gameStore = new GameStore(this);
        this.handManagerStore = new HandManagerStore(this);
        this.deckStore = new DeckStore(this);
        this.dealerStore = new DealerStore(this);
        this.dealersHandStore = new HandStore(this);
        this.walletStore = new WalletStore(this);
    }
}

export default RootStore;
