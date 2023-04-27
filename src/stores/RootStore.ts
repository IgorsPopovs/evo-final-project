import DeckStore from "./DeckStore";
import HandStore from "./HandStore";
import WalletStore from "./WalletStore";
import GameStore from "./GameStore";
import DealerStore from "./DealerStore";
import HandManagerStore from "./HandManagerStore";
import MessengerStore from "./MessengerStore";

class RootStore {
    public deckStore: DeckStore;
    public dealerStore: DealerStore;
    public handManagerStore: HandManagerStore;
    public dealersHandStore: HandStore;
    public walletStore: WalletStore;
    public gameStore: GameStore;
    public messengerStore: MessengerStore;

    constructor() {
        this.gameStore = new GameStore(this);
        this.handManagerStore = new HandManagerStore(this);
        this.deckStore = new DeckStore(this);
        this.dealerStore = new DealerStore(this);
        this.dealersHandStore = new HandStore(this, 0);
        this.walletStore = new WalletStore(this);
        this.messengerStore = new MessengerStore(this);
    }
}

export default RootStore;
