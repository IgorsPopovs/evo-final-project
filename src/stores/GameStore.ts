import {GameStatus} from "../utils/Constant";
import RootStore from "./RootStore";
import {action, autorun, IReactionDisposer, makeAutoObservable, reaction, runInAction,} from "mobx";

class GameStore {
    rootStore: RootStore;
    status: GameStatus = GameStatus.playersBet;
    disposers: IReactionDisposer[] = [];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {
            status: true,
            setStatus: action,
        });
        this.rootStore = rootStore;

        this.disposers.push(
            autorun(() => {
                if (this.status === GameStatus.playersTurn && rootStore.playersHandStore.isDone) {
                    runInAction(() => {
                        this.setStatus(GameStatus.dealersTurn);
                    });
                }
            }),
            autorun(() => {
                if (this.status === GameStatus.dealersTurn && rootStore.dealersHandStore.isDone) {
                    runInAction(() => {
                        this.setStatus(GameStatus.turnsEnded);
                    })
                }
                ;
            }),
            reaction(
                () => ({
                    status: this.status,
                }),
                ({status}) => {
                    if (status === GameStatus.turnsEnded) {
                        const playerScore = rootStore.playersHandStore.calculateScore;
                        const dealerScore = rootStore.dealersHandStore.calculateScore;
                        if (
                            (playerScore > dealerScore && playerScore <= 21) ||
                            dealerScore > 21
                        ) {
                            runInAction(() => {
                                rootStore.walletStore.deposit(
                                    rootStore.walletStore.bet + rootStore.walletStore.bet
                                );
                                rootStore.walletStore.setBet(0);//TODO: move it to walletStore
                                this.setStatus(GameStatus.playerWon);
                            });
                        } else if (
                            (playerScore < dealerScore && dealerScore <= 21) ||
                            playerScore > 21
                        ) {
                            runInAction(() => {
                                rootStore.walletStore.setBet(0);
                                this.setStatus(GameStatus.dealerWon);
                            });
                        } else if (playerScore === dealerScore) {
                            runInAction(() => {
                                rootStore.walletStore.deposit(rootStore.walletStore.bet);
                                rootStore.walletStore.setBet(0);
                                this.setStatus(GameStatus.tie);
                            });
                        }
                    }
                }
            )
        );
    }

    setStatus(newStatus: GameStatus) {
        this.status = newStatus;
    }

    dispose() {
        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
    }
}

export default GameStore;
