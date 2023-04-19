import {GameStatus, HandStatus} from "../utils/Constant";
import RootStore from "./RootStore";
import {action, autorun, IReactionDisposer, makeAutoObservable, reaction,} from "mobx";
import HandStore from "./HandStore";

class GameStore {
    private rootStore: RootStore;
    private disposers: IReactionDisposer[] = [];
    public status: GameStatus = GameStatus.init;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.setStatus(GameStatus.playersBet);

        makeAutoObservable(this, {
            setStatus: action,
        });

        this.disposers.push(
            autorun(() => {
                if (this.status === GameStatus.playersTurn && this.rootStore.handManagerStore.isDone) {
                    console.log(this.rootStore.handManagerStore.isDone);
                    this.setStatus(GameStatus.dealersTurn);
                }
            }),
            autorun(() => {
                if (this.status === GameStatus.dealersTurn && this.rootStore.dealersHandStore.isDone) {
                    console.log('dealer is done');
                    this.setStatus(GameStatus.turnsEnded);
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
        this.status = newStatus;
    }


    private playerWins(hand: HandStore) {
            this.rootStore.walletStore.deposit(hand.betStore.getBet * 2);
            hand.betStore.setBet(0);
            hand.setStatus(HandStatus.Win);
    }

    private playerLoses(hand: HandStore) {
            hand.betStore.setBet(0);
            hand.setStatus(HandStatus.Lost);
    }

    private tie(hand: HandStore) {
            this.rootStore.walletStore.deposit(hand.betStore.getBet);
            hand.betStore.setBet(0);
            hand.setStatus(HandStatus.Tie);
    }
}

export default GameStore;
