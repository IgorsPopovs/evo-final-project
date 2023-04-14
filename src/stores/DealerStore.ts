import {action, autorun, makeObservable} from "mobx";
import RootStore from "./RootStore";
import {GameStatus} from "../utils/Constant";

class DealerStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            initDeal: action,
            exposeCards: action,
        });
        this.rootStore = rootStore;

        autorun(() => {
            if (
                this.rootStore.gameStore.status === GameStatus.dealersTurn &&
                !this.rootStore.dealersHandStore.isDone
            ) {
                if (
                    this.rootStore.dealersHandStore.calculateScore >= 17 ||
                    this.rootStore.dealersHandStore.calculateScore > rootStore.playersHandStore.calculateScore ||
                    this.rootStore.playersHandStore.calculateScore > 21
                ) {
                    this.rootStore.dealersHandStore.setDone();
                    console.log('setting done')
                } else {
                    this.rootStore.dealerStore.hitDealer(false);
                }
            }
        })
    }

    initDeal(): void {
        this.hit();
        this.hit();
        this.hitDealer(false);
        this.hitDealer(true);
        this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
    }

    hit(): void {
        const card = this.rootStore.deckStore.dealCard();
        if (card !== undefined) {
            // this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
            card.isHidden = false;
            this.rootStore.playersHandStore.addCard(card);
            // this.rootStore.gameStore.setStatus(GameStatus.dealersTurn);
        }
    };

    hitDealer(hidden: boolean): void {
        const card = this.rootStore.deckStore.dealCard();
        if (card !== undefined) {
            // this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
            card.isHidden = hidden;
            this.rootStore.dealersHandStore.addCard(card);
            // this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
        }
    }

    exposeCards(): void {
        this.rootStore.dealersHandStore.cards.forEach((card) => {
            card.isHidden = false;
        }) ;


    }

}

export default DealerStore;
