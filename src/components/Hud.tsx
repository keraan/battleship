import React, { useEffect, useReducer } from "react";
import Game from "./Game";

type HudProps = {
    game: Game;
    isPlacementPhase: boolean
}

export default function Hud({game, isPlacementPhase}: HudProps) {
    const convertTurnToString = () => {
        return game.getTurn() === 1 ? "Player One" : "Player Two";
    }

    const getWinner = () => {
        return game.getTurn() === 2 ? "Player One" : "Player Two";
    }

    let message = "Current Turn: " + convertTurnToString()
    if (isPlacementPhase) {
        message = "Place your ships! RMB to change direction"
    } else if (game.gameOver()) {
        message = "Game Over! " + getWinner() + " Wins! "
    }

    useEffect(() => {
        convertTurnToString()
    }, [game])

    return (
        <div className="hud">
            {message}
        </div>
    )
}