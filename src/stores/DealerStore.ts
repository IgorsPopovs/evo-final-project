import {makeAutoObservable, reaction} from "mobx";
import RootStore from "./RootStore";
import {GameStatus, HandStatus} from "../utils/Constant";
import HandStore from "./HandStore";

class DealerStore {
    private rootStore: RootStore;

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
        this.rootStore.handManagerStore.hands[0].setStatus(HandStatus.Playing);
        await this.hit(this.rootStore.handManagerStore.hands[0], false);
        await this.hit(this.rootStore.handManagerStore.hands[0], false);
        await this.hit(this.rootStore.dealersHandStore, false);
        await this.hit(this.rootStore.dealersHandStore, true);

        await this.rootStore.gameStore.setStatus(GameStatus.playersTurn);
    }

    public async dealersTurn() {
        this.exposeCards();
        while (!this.rootStore.dealersHandStore.isDone && this.rootStore.gameStore.getStatus() === GameStatus.dealersTurn) {
            if (this.canDealToDealer()) {
                console.log('dealing to diller')
                await this.hit(this.rootStore.dealersHandStore, false);
            } else {
                console.log('setting done')
                this.rootStore.dealersHandStore.setDone();
            }
        }
        await this.rootStore.gameStore.setStatus(GameStatus.turnsEnded);
        await this.rootStore.gameStore.calculateResults();
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
        return new Promise(async (resolve) => {
            const card = this.rootStore.deckStore.dealCard();
            const deckPosition = this.rootStore.deckStore.getPosition();
            if (card !== undefined) {
                hand.setShowBlankCard(true);
                await setTimeout(async () => {
                    const [handPositionX, handPositionY] = hand.getPosition();
                    this.setHandPosition(handPositionX - deckPosition.x, handPositionY - deckPosition.y);
                    this.rootStore.deckStore.setDealingAnimation(true);
                    await setTimeout(() => {
                        hand.setShowBlankCard(false);
                        if (!hidden) {
                            card.expose();
                        }
                        hand.addCard(card);
                        this.rootStore.deckStore.setDealingAnimation(false);
                        resolve();
                    }, 1000);
                },100);
            } else {
                return Promise.reject('No more cards in deck');
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
