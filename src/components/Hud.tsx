import { useEffect } from "react";
import Game from "./Game";

type HudProps = {
    game: Game;
    isPlacementPhase: boolean
    content: string
}

export default function Hud({game, isPlacementPhase, content}: HudProps) {
    const convertTurnToString = () => {
        return game.getTurn() === 1 ? "Player One" : "Player Two (Bot)";
    }

    const getWinner = () => {
        return game.getTurn() === 2 ? "Player One" : "Player Two (Bot)";
    }

    let message = "Current Turn: " + convertTurnToString()
    if (isPlacementPhase) {
        message = "Place your ships! RMB to change direction"
    } else if (game.gameOver()) {
        message = "Game Over! " + getWinner() + " Wins! "
    }

    if (content !== "") {
        message = content
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