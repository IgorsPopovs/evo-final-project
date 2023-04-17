import {GameStatus, HandStatus} from "../utils/Constant";
import RootStore from "./RootStore";
import {autorun, IReactionDisposer, makeAutoObservable, reaction, runInAction,} from "mobx";
import HandStore from "./HandStore";

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
                    console.log('dealer is done');
                    runInAction(() => {
                        this.setStatus(GameStatus.turnsEnded);
                    })
                }
            }),

            reaction(
                () => this.status,
                (status) => {
                    if (status === GameStatus.turnsEnded) {
                        console.log('Who is the winner?');
                        const dealerScore = this.rootStore.dealersHandStore.totalScore;
                        this.rootStore.handManagerStore.hands.forEach((hand) => {
                            const playerScore = hand.totalScore;
                            if (this.verifyPlayerWins(dealerScore, playerScore)) {
                                this.playerWins(hand);
                            } else if (this.verifyPlayerLoses(dealerScore, playerScore)) {
                                this.playerLoses(hand);
                            } else if (this.verifyTie(dealerScore, playerScore)) {
                                this.tie(hand);
                            }
                        });
                    }
                }
            )
        );
    }

    private verifyPlayerWins(dealerScore: number, playerScore: number) {
        return (
            (playerScore > dealerScore && playerScore <= 21) ||
            (playerScore <= 21 && dealerScore > 21)
        );
    }

    private verifyPlayerLoses(dealerScore: number, playerScore: number) {
        return (
            (dealerScore > playerScore && dealerScore <= 21) ||
            (dealerScore <= 21 && playerScore > 21)
        );
    }

    private verifyTie(dealerScore: number, playerScore: number) {
        return (
            (dealerScore === playerScore) ||
            (dealerScore > 21 && playerScore > 21)
        );
    }

    setStatus(newStatus: GameStatus) {
        if (newStatus === GameStatus.dealersTurn) {
            this.rootStore.dealerStore.exposeCards();
        }
        this.status = newStatus;
    }


    private playerWins(hand: HandStore) {
        runInAction(() => {
            this.rootStore.walletStore.deposit(hand.betStore.bet * 2);
            hand.betStore.setBet(0);
            hand.setStatus(HandStatus.Win);
        });
    }

    private playerLoses(hand: HandStore) {
        runInAction(() => {
            hand.betStore.setBet(0);
            hand.setStatus(HandStatus.Lost);
        });
    }

    private tie(hand: HandStore) {
        runInAction(() => {
            this.rootStore.walletStore.deposit(hand.betStore.bet);
            hand.betStore.setBet(0);
            hand.setStatus(HandStatus.Tie);

            // this.setStatus(GameStatus.tie);
        });
    }

    private endTurn(): void {
        runInAction(() => {
            console.log(this.rootStore.handManagerStore.isDone);
            this.setStatus(GameStatus.dealersTurn);
        });
    }



    dispose() {
        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
    }
}

export default GameStore;
