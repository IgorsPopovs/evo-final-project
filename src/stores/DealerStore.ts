import {action, autorun, makeObservable} from "mobx";
import RootStore from "./RootStore";
import {GameStatus, Users} from "../utils/Constant";

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
                    this.hit(Users.Dealer, false);
                }
            }
        })
    }

    initDeal(): void {
        this.hit(Users.Player, false);
        this.hit(Users.Player, false);
        this.hit(Users.Dealer, false);
        this.hit(Users.Dealer, true);
        this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
    }

    hit(receiver:Users, hidden: boolean): void {
        const card = this.rootStore.deckStore.dealCard();
        if (card !== undefined) {
            card.isHidden = hidden;
            if (receiver === Users.Player) {
                this.rootStore.playersHandStore.addCard(card);
            }
            if (receiver === Users.Dealer) {
                this.rootStore.dealersHandStore.addCard(card);
            }
        }
    }

    exposeCards(): void {
        this.rootStore.dealersHandStore.cards.forEach((card) => {
            card.isHidden = false;
        }) ;


    }

}

export default DealerStore;
