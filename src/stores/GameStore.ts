import {GameStatus, HandStatus} from "../utils/Constant";
import RootStore from "./RootStore";
import {IReactionDisposer, makeAutoObservable, reaction,} from "mobx";
import HandStore from "./HandStore";

class GameStore {
    private rootStore: RootStore;
    private disposers: IReactionDisposer[] = [];
    public status: GameStatus = GameStatus.init;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.setStatus(GameStatus.playersBet);

        makeAutoObservable(this, {}, {autoBind: true});

        this.disposers.push(
            reaction(
                () => (this.status === GameStatus.playersTurn && this.rootStore.handManagerStore.isDone),
                (playerFinished) => {
                    if (playerFinished) {
                        console.log('Player is DONE');
                        this.setStatus(GameStatus.dealersTurn);
                    }
                }
            ),

            reaction(() => (this.status === GameStatus.dealersTurn && this.rootStore.dealersHandStore.isDone),
                (dealerFinished) => {
                    if (dealerFinished) {
                        console.log('Dealer is DONE');
                        this.setStatus(GameStatus.turnsEnded);
                    }
                }),

            reaction(
                () => (this.status === GameStatus.turnsEnded),
                (turnsEnded) => {
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

    public setStatus(newStatus: GameStatus) {
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
