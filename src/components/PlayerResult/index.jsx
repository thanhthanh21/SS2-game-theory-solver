import React from "react";
import "./style.scss";
export default function PlayerResult() {
    return(
        <div className="grid-item-container">
        <div className="column">#1</div>
        <div className="column player-name">Player Name</div>
        <div className="column">Choosen strategy name</div>
        <div className="column">Payoff value</div>
    </div>
    )
}