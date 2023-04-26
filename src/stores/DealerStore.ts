import {reaction, makeAutoObservable} from "mobx";
import RootStore from "./RootStore";
import {GameStatus} from "../utils/Constant";
import HandStore from "./HandStore";

class DealerStore {
    private rootStore: RootStore;

    public isPassingCard: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => (this.rootStore.gameStore.getStatus() === GameStatus.initialDeal),
            async (initialDeal) => {
                if (initialDeal) {
                    await this.initDeal();
                }
            }
        );

        makeAutoObservable(this, {}, {autoBind: true});
    }

    private async initDeal() {
        await this.hit(this.rootStore.handManagerStore.hands[0], false);
        await this.hit(this.rootStore.handManagerStore.hands[0], false);
        await this.hit(this.rootStore.dealersHandStore, false);
        await this.hit(this.rootStore.dealersHandStore, true);

        await this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
    }

    public async dealersTurn() {
        this.exposeCards();
        while (!this.rootStore.dealersHandStore.isDone) {
            console.log(this.rootStore.dealersHandStore.totalScore + '  ' + this.isPassingCard);
            if (this.canDealToDealer()) {
                await this.hit(this.rootStore.dealersHandStore, false);
            } else {
                this.rootStore.dealersHandStore.setDone();
                console.log('dealer done')
                await this.rootStore.gameStore.setStatus(GameStatus.turnsEnded);
            }
        }
    }


    public async double(hand: HandStore) {
        hand.betStore.addBet(hand.betStore.getBet);
        await this.hit(hand, false);
        hand.setDone();
    }


    public setHandPosition(x: number, y: number): void {
        const deck = document.querySelector('.deck-container') as HTMLDivElement;
        if (deck !== null) {
            deck.style.setProperty('--hand-position-x', `${x}px`);
            deck.style.setProperty('--hand-position-y', `${y}px`);
        }
    }

    public hit(hand: HandStore, hidden: boolean): Promise<void> {
        return new Promise((resolve) => {
            const card = this.rootStore.deckStore.dealCard();
            const deckPosition = this.rootStore.deckStore.getPosition();
            if (card !== undefined) {


                const [handPositionX, handPositionY] = hand.getPosition();
                this.setHandPosition(handPositionX - deckPosition.x, handPositionY - deckPosition.y);
                this.rootStore.deckStore.setDealingAnimation(true);
                hand.setShowBlankCard(true);
                this.isPassingCard = true;

                setTimeout(() => {
                    hand.setShowBlankCard(false);
                    if (!hidden) {
                        card.expose();
                    }
                    hand.addCard(card);
                    this.isPassingCard = false; // update state to indicate that the card passing is finished
                    this.rootStore.deckStore.setDealingAnimation(false);
                    resolve();
                }, 500);
            } else {
                return Promise.reject('No more cards in deck'); // Reject the Promise if there are no more cards in the deck
            }
        });
    }

    private canDealToDealer(): boolean {
        return this.rootStore.dealersHandStore.totalScore < 17;
    }

    public exposeCards(): void {
        this.rootStore.dealersHandStore.cards.forEach((card) => {
            card.expose();
        });
    }
}

export default DealerStore;
