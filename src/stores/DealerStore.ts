import {autorun, makeAutoObservable, runInAction} from "mobx";
import RootStore from "./RootStore";
import {GameStatus, Users} from "../utils/Constant";

class DealerStore {//extends HandStore{
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        autorun(() => {
            if (
                this.rootStore.gameStore.status === GameStatus.dealersTurn
            ) {
                while (!this.rootStore.dealersHandStore.isDone) {
                    if (this.canDealToDealer()) {
                        runInAction(() => this.hit(Users.Dealer, false));
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
            this.hit(Users.Player, false);
            this.hit(Users.Player, false);
            this.hit(Users.Dealer, false);
            this.hit(Users.Dealer, true);
            // this.rootStore.handManagerStore.hands[0].checkNaturalBlackJack();
            this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
        });
    }

    public hit(receiver: Users, hidden: boolean, hand: number = 0): void {
        const card = this.rootStore.deckStore.dealCard();
        if (card !== undefined) {
            if (receiver === Users.Player) {
                this.rootStore.handManagerStore.hands[hand].addCard(card);
                // if (this.rootStore.handManagerStore.hands[hand].calculateScore >= 21) {
                //     this.rootStore.handManagerStore.hands[hand].setDone();
                // }
            } else if (receiver === Users.Dealer) {
                this.rootStore.dealersHandStore.addCard(card);
            }
            if (!hidden) {
                card.expose();
            }
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
