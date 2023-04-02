import React from "react";
import {observer} from "mobx-react";
import PlayerStore from "../stores/PlayerStore";
import {Card} from "./Card";

interface IPlayerProps {
    playerStore: PlayerStore;
}

class Player extends React.Component<IPlayerProps> {
    //TODO: change to Hand
    render() {
        const {playerStore} = this.props;
        return (
            <div>
                <div className="hand">
                    {playerStore.cards.length > 0 ? (
                        playerStore.cards.map((card, index) => (
                            <Card
                                key={index}
                                value={card.value}
                                suit={card.suit}
                                isHidden={card.isHidden}
                            />
                        ))
                    ) : (
                        <h2> Player has no cards</h2>
                    )}
                </div>
            </div>
        );
    }
}

export default observer(Player);
