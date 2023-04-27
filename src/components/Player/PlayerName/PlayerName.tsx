import React from "react";
import "./PlayerName.css";

type PlayerNameProps = {
    name: string;
}
const PlayerName: React.FC<PlayerNameProps> = ({name}) => {
    return (
        <div className="player-name">
            <h2>{name}</h2>
        </div>
    );
}

export default (PlayerName);
