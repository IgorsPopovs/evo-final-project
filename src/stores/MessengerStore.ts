import {computed, makeObservable, reaction} from "mobx";
import RootStore from "./RootStore";
import {currencySign, GameStatus, HandStatus} from "../utils/Constant";
import HandStore from "./HandStore";


type summaryProps = { id: number, status: HandStatus, bet: number }

class MessengerStore {
    private rootStore: RootStore;
    private summary: summaryProps[] | undefined;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.summary = undefined;

        makeObservable(this, {getMessage: computed});

        reaction(
            () => (this.rootStore.gameStore.getStatus() === GameStatus.dealersTurn),
            (betPlaced) => {
                if (betPlaced) {
                    this.summary = this.rootStore.handManagerStore.hands.map((hand: HandStore): summaryProps => {
                        return {
                            id: hand.id,
                            status: hand.getStatus(),
                            bet: hand.betStore.getBet,
                        }
                    });
                    // console.log(this.summary);
                }
            });

        reaction(
            () => (this.rootStore.gameStore.getStatus() === GameStatus.init),
            (resultsCalculated) => {
                if (resultsCalculated && this.summary !== undefined) {
                    for (let i = 0; i < this.summary.length; i++) {
                        this.summary[i].status = this.rootStore.handManagerStore.hands[i].getStatus();
                        // console.log('setting stauuuus' + this.summary[i].status);
                    }
                }
            });


    }

    public get getMessage(): string {
        switch (this.rootStore.gameStore.getStatus()) {
            case GameStatus.init:
                return this.getSummary();
            case GameStatus.playersBet:
                return "Make a bet!";
            case GameStatus.initialDeal:
                return "Dealing cards...";
            case GameStatus.playersTurn:
                return "Make a decision!"
            case GameStatus.dealersTurn:
                return "Dealer's turn...";
            case GameStatus.turnsEnded:
                return "Who is the winner?";
            default:
                return "";
        }
    }

    private getSummary(): string {

        if (this.summary !== undefined) {
            let result: string[] = [];
            this.summary.forEach((sum) => {
                // console.log(this.summary);
                    if (this.summary!.length === 1) {
                        if (sum.status === HandStatus.Tie) {
                            result.push("It's a TIE!");
                        } else {
                            result.push("You " + HandStatus[sum.status] + " " + sum.bet + currencySign);
                        }
                    }
                    if (this.summary!.length === 2) {
                        if (sum.status === HandStatus.Tie) {
                            result.push("Hand #" + sum.id + " has a TIE");
                        } else {
                            result.push("Hand#" + sum.id + " " + HandStatus[sum.status] + " " + sum.bet + currencySign);
                        }
                    }
                }
            )
            return result.join(" and ");
        }
        return "";
    }

    private getBetResult() {
        return this.summary
    }

}

export default MessengerStore;