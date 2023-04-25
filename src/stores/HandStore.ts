import {IReactionDisposer, makeAutoObservable, reaction} from "mobx";
import RootStore from "./RootStore";
import BetStore from "./BetStore";
import CardStore from "./CardStore";
import {HandCombination, HandStatus} from "../utils/Constant";
import HandActionsStore from "./HandActionsStore";

class HandStore {
    private rootStore: RootStore;
    private status: HandStatus = HandStatus.Playing;
    private combination: HandCombination = HandCombination.None;
    public id: number;
    public cards: CardStore[] = [];
    public showBlankCard: boolean = true;
    public isDone: boolean = false;
    public betStore: BetStore;
    public disposers: IReactionDisposer[] = [];
    public handActionsStore: HandActionsStore;

    constructor(rootStore: RootStore, id: number) {
        this.id = id;
        this.rootStore = rootStore;
        this.betStore = new BetStore(this.rootStore);
        this.handActionsStore = new HandActionsStore(this.rootStore, this);


        makeAutoObservable(this, {}, {autoBind: true})

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

    public getPosition() {
        const handElement = document.getElementById("hand-" + this.id);
        if (handElement) {
            if (handElement.children.namedItem('blank-card')){
                const blankCard = handElement.children.namedItem('blank-card') as HTMLElement;
                const blankCardRect = blankCard.getBoundingClientRect();
                console.log('returnin Blank Card position')
                return [blankCardRect.x , blankCardRect.y];
            }
            // console.log(handElement.getBoundingClientRect());
            if (handElement.lastChild){
                console.log(handElement.lastChild)
                const card = handElement.lastChild as HTMLElement;
                const cardRect = card.getBoundingClientRect();
                console.log('returnin Card position')
                // return cardRect;
                return [cardRect.x , cardRect.y];
            }
            console.log(handElement);
            console.log('returnin Hand position')
            return [handElement.getBoundingClientRect().x, handElement.getBoundingClientRect().y];
        }
        throw new Error(`Could not find element with id ${this.id}`);
    }

    public setStatus(status: HandStatus) {
        this.status = status;
    }

    public getStatus(): HandStatus {
        return this.status;
    }

    public setCombination(combo: HandCombination) {
        this.combination = combo;
    }

    public getCombination(): HandCombination {
        return this.combination;
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

    public async splitHand() {
        const popCard = this.pullCard();
        if (popCard !== undefined) {
            const newHand = new HandStore(this.rootStore, this.rootStore.handManagerStore.hands.length + 1);
            newHand.addCard(popCard)
            // await this.rootStore.dealerStore.hit(newHand, false);
            newHand.betStore.addBet(this.betStore.getBet);
            this.rootStore.handManagerStore.hands.push(newHand);

            await this.rootStore.dealerStore.hit(this, false);
            await this.rootStore.dealerStore.hit(newHand, false);
        }
    }
}

export default HandStore;
