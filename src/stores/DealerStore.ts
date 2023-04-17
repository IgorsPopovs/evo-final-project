import {autorun, makeAutoObservable} from "mobx";
import RootStore from "./RootStore";
import {GameStatus, Users} from "../utils/Constant";

class DealerStore {//extends HandStore{
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        autorun(() => {
            if (
                this.rootStore.gameStore.status === GameStatus.dealersTurn &&
                !this.rootStore.dealersHandStore.isDone
            ) {
                if (this.canDealToDealer()) {
                    this.hit(Users.Dealer, false);
                } else {
                    this.rootStore.dealersHandStore.setDone();
                    console.log('dealer done')
                }
            }
        })

        makeAutoObservable(this);
    }

    initDeal(): void {
        this.hit(Users.Player, false);
        this.hit(Users.Player, false);
        this.hit(Users.Dealer, false);
        this.hit(Users.Dealer, true);
        this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
    }

    hit(receiver: Users, hidden: boolean, hand: number = 0): void {
        const card = this.rootStore.deckStore.dealCard();
        if (card !== undefined) {
            if (receiver === Users.Player) {
                this.rootStore.handManagerStore.hands[hand].addCard(card);
                if (this.rootStore.handManagerStore.hands[hand].calculateScore >= 21) {
                    this.rootStore.handManagerStore.hands[hand].setDone();
                }
            } else if (receiver === Users.Dealer) {
                this.rootStore.dealersHandStore.addCard(card);
            }
            if (!hidden) {
                card.expose();
            }
        }
    }

    private canDealToDealer(): boolean {
        return this.rootStore.dealersHandStore.calculateScore < 17; //||
        // this.rootStore.dealersHandStore.calculateScore > rootStore.playersHandStore.calculateScore ||
        // this.rootStore.playersHandStore.calculateScore > 21
    }

    exposeCards(): void {
        this.rootStore.dealersHandStore.cards.forEach((card) => {
            card.expose();
        });
    }

}

export default DealerStore;
