import React from "react";
import "./style.scss";

export default function PlayerResult(props) {
  const { player } = props;

  return (
    <div className="grid-item-container">
      <div className="column">{player.idex}</div>
      <div className="column player-name">{player.name}</div>
      <div className="column">{player.choosenStrategy}</div>
      <div className="column">{player.payoffValue}</div>
    </div>
  );
}