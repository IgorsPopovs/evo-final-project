import React from 'react';
import './App.css';
import Deck from "./Deck";
import {createDeck} from "./Helper";

function App() {
    return (
        <div className="App">
            <Deck
            cards={createDeck()}
            />
        </div>
    );
}

export default App;
