import {autorun, makeAutoObservable, runInAction} from "mobx";
import RootStore from "./RootStore";
import {GameStatus} from "../utils/Constant";
import HandStore from "./HandStore";

class DealerStore {//extends HandStore{
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        autorun(() => {
            if (
                this.rootStore.gameStore.status === GameStatus.dealersTurn
            ) {
                runInAction(() => this.exposeCards());
                while (!this.rootStore.dealersHandStore.isDone) {
                    console.log(this.rootStore.dealersHandStore.totalScore);
                    if (this.canDealToDealer()) {
                        runInAction(() => this.hit(this.rootStore.dealersHandStore, false));
                    } else {
                        runInAction(() => this.rootStore.dealersHandStore.setDone());
                        console.log('dealer done')
                    }
                }
            }
        });

        autorun(() => {
            if (this.rootStore.gameStore.status === GameStatus.initialDeal) {
                runInAction(() => this.initDeal());
            }
        });

        makeAutoObservable(this);
    }

    private initDeal(): void {
        runInAction(() => {
            this.hit(this.rootStore.handManagerStore.hands[0], false);
            this.hit(this.rootStore.handManagerStore.hands[0], false);
            this.hit(this.rootStore.dealersHandStore, false);
            this.hit(this.rootStore.dealersHandStore, true);
            // this.rootStore.handManagerStore.hands[0].checkNaturalBlackJack();
            this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
        });
    }

    public hit(hand: HandStore, hidden: boolean): void {
        const card = this.rootStore.deckStore.dealCard();
        if (card !== undefined) {
            if (!hidden) {
                card.expose();
            }
            hand.addCard(card);
            // if (hand.owner === Users.Player) {
            //     this.rootStore.handManagerStore.hands[hand].addCard(card);
            //     // if (this.rootStore.handManagerStore.hands[hand].calculateScore >= 21) {
            //     //     this.rootStore.handManagerStore.hands[hand].setDone();
            //     // }
            // } else if (receiver === Users.Dealer) {
            //     this.rootStore.dealersHandStore.addCard(card);
            // }
        }
    }

    private canDealToDealer(): boolean {
        return this.rootStore.dealersHandStore.totalScore < 17; //||
        // this.rootStore.dealersHandStore.calculateScore > rootStore.playersHandStore.calculateScore ||
        // this.rootStore.playersHandStore.calculateScore > 21
    }

    public exposeCards(): void {
        this.rootStore.dealersHandStore.cards.forEach((card) => {
            card.expose();
        });
    }

}

export default DealerStore;
