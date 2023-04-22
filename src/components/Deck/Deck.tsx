import React, {useContext} from 'react';
import '../Hand/Card/Card';
import {Card} from "../Hand/Card/Card";
import {observer} from "mobx-react";
import {RootStoreContext} from "../../App";
import "./Deck.css";
import {Container, Sprite, Text} from "@pixi/react";
import {textStyle} from "../../utils/Helper";

const Deck: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const cards = rootStore.deckStore.getCards;

    // return (
    //     <div className={"deck-container"}>
    //         <h2>DECK</h2>
    //         <h2>Cards count: {cards.length}</h2>
    //         <div className="hand">
    //             {cards && cards.length > 0 ? (
    //                 <Card key={9} cardStore={cards[cards.length -1]}/>
    //             ) : (
    //                 <h2>No more cards in the deck</h2>
    //             )}
    //         </div>
    //     </div>
    // );

    return (
        <Container x={200} y={0}>
            {cards && cards.length > 0 ? (
                <Card key={cards.length - 1} cardStore={cards[cards.length - 1]} xModifier={0}/>
            ) : (
                <Text
                    text={"No more cards in the deck"}
                    anchor={0}
                    x={0}
                    y={0}
                    style={textStyle}
                />
            )
            }
        </Container>
    );
}


export default observer(Deck);