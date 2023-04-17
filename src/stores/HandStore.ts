import {action, IReactionDisposer, makeAutoObservable, reaction} from "mobx";
import RootStore from "./RootStore";
import BetStore from "./BetStore";
import CardStore from "./CardStore";
import {HandCombination, HandStatus} from "../utils/Constant";

class HandStore {
    cards: CardStore[] = [];
    isDone: boolean = false;
    status: HandStatus = HandStatus.Playing;
    combination: HandCombination = HandCombination.None;
    rootStore: RootStore;
    betStore: BetStore;
    disposers: IReactionDisposer[] = [];


    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.betStore = new BetStore(this.rootStore);

        makeAutoObservable(this, {
            setDone: action,
            addCard: action,
        });

        this.disposers.push(
            reaction(
                () => ({
                    status: this.status,
                }),
                ({status}) => {
                    if (status === HandStatus.Win) console.log('results... I WON!');
                    if (status === HandStatus.Lost) console.log('results... I LOST!');
                    if (status === HandStatus.Tie) console.log('results... I Dont know!');
                }
            ),
        );
    }

    public setStatus(status: HandStatus) {
        this.status = status;
    }

    public setCombination(combo: HandCombination) {
        this.combination = combo;
    }

    public addCard(card: CardStore) {
        this.cards.push(card);
        console.log(this.totalScore);
        this.checkIsDone();
        this.assignCombination();
    }

    private assignCombination() {
        console.log('assigning combination...' + this.totalScore);
        if (this.cards.length === 2 && this.totalScore === 21) this.setCombination(HandCombination.NaturalBlackJack);
        else if (this.totalScore === 21) this.setCombination(HandCombination.BlackJack);
        else if (this.checkSplit()) this.setCombination(HandCombination.Split);
        else if (this.totalScore > 21) this.setCombination(HandCombination.Bust);
        else this.setCombination(HandCombination.None);
    }

    private checkSplit() {
        console.log('SPLIT ' + this.rootStore.handManagerStore.handsLength)
        return (
            (this.cards.length === 2) &&
            (this.cards[0].value === this.cards[1].value) &&
            (this.rootStore.handManagerStore.handsLength === 1)
        );
    }

    private checkIsDone() {
        if (this.totalScore >= 21) {
            this.setDone();
        }
    }

    private pullCard() {
        return this.cards.pop();
    }

    public get totalScore() {
        let total = 0;
        let aceCount = 0;
        this.cards.forEach((card) => {
            if (!card.isHidden) {
                if (card.value === "J" || card.value === "Q" || card.value === "K") {
                    total += 10;
                } else if (card.value === "A") {
                    aceCount++;
                } else {
                    total += Number(card.value);
                }
            }
        });

        for (let i = 0; i < aceCount; i++) {
            console.log('t:' + total + ' aC:' + aceCount + ' i:' + i)
            if (total + 11 + aceCount - i - 1 > 21) {
                total += 1;
            } else {
                total += 11;
            }
        }

        return total;
    }

    public reset() {
        this.cards = [];
        this.isDone = false;
    }

    public setDone() {
        this.isDone = true;
        console.log("done");
    }

    public splitHand() {
        const popCard = this.pullCard();
        if (popCard !== undefined) {
            const newHand = new HandStore(this.rootStore);
            newHand.addCard(popCard)
            newHand.betStore.addBet(this.betStore.bet);
            this.rootStore.handManagerStore.hands.push(newHand);

            this.rootStore.dealerStore.hit(this, false);
            this.rootStore.dealerStore.hit(newHand, false);
        }
    }
}

export default HandStore;
