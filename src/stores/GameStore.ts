import {GameStatus} from "../utils/Constant";
import RootStore from "./RootStore";
import {autorun, IReactionDisposer, makeAutoObservable, reaction, runInAction,} from "mobx";

class GameStore {
    rootStore: RootStore;
    status: GameStatus = GameStatus.init;
    disposers: IReactionDisposer[] = [];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.setStatus(GameStatus.playersBet);

        this.disposers.push(
            // autorun(()=> {console.log()})
            autorun(() => {
                if (this.status === GameStatus.playersTurn && this.rootStore.handManagerStore.isDone) {
                    runInAction(() => {
                        console.log(this.rootStore.handManagerStore.isDone);
                        this.setStatus(GameStatus.dealersTurn);
                    });
                }
            }),
            autorun(() => {
                if (this.status === GameStatus.dealersTurn && this.rootStore.dealersHandStore.isDone) {
                    runInAction(() => {
                        this.setStatus(GameStatus.turnsEnded);
                    })
                }
            }),
            reaction(
                () => ({
                    status: this.status,
                }),
                ({status}) => {
                    if (status === GameStatus.turnsEnded) {
                        console.log('Whi is winner?');
                        this.rootStore.handManagerStore.hands.forEach((hand) => {

                            const playerScore = hand.calculateScore;
                            const dealerScore = this.rootStore.dealersHandStore.calculateScore;
                            if (
                                (playerScore > dealerScore && playerScore <= 21) ||
                                dealerScore > 21
                            ) {
                                runInAction(() => {
                                    this.rootStore.walletStore.deposit(
                                        hand.betStore.bet + hand.betStore.bet
                                    );
                                    hand.betStore.setBet(0);//TODO: move it to walletStore
                                    hand.setWon(true);
                                });
                            } else if (
                                (playerScore < dealerScore && dealerScore <= 21) ||
                                playerScore > 21
                            ) {
                                runInAction(() => {
                                    hand.betStore.setBet(0);
                                    hand.setWon(false);
                                });
                            } else if (playerScore === dealerScore) {
                                runInAction(() => {
                                    this.rootStore.walletStore.deposit(hand.betStore.bet);
                                    hand.betStore.setBet(0);
                                    this.setStatus(GameStatus.tie);
                                });
                            }
                        })
                    }
                }
            ),
        );
    }

    setStatus(newStatus: GameStatus) {
        if (newStatus === GameStatus.dealersTurn) {
            this.rootStore.dealerStore.exposeCards();
        }
        this.status = newStatus;
    }

    dispose() {
        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
    }
}

export default GameStore;
