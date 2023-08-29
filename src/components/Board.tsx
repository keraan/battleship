import React, { useState } from "react";
import Gameboard from "./Gameboard";
import '../styles/board.css'
import BoardRow from "./BoardRow";
import Player from "./Player";
import Ship from "./Ship";
import { DIRECTION } from "../types/directions";

type BoardProps = {
    handleNextTurn: (row: number, col: number, playerId: number) => void
    player: Player
    turn: number
    isPlacementPhase: boolean
    currentShip: Ship | null
    currentDirection: DIRECTION
}

export default function Board({handleNextTurn, player, turn, isPlacementPhase, currentShip, currentDirection}: BoardProps) {
    const [highlightedCells, setHighlightedCells] = useState(new Set());
    
    const board = player.getBoard().getBoardState()
    //const board = gameBoard.getBoardState()
    let boardClass = "board"
    if (turn === player.getId()) boardClass = "board active"

    const handleMouseEnter = (rowIndex: number, cellIndex: number) => {
        if (!isPlacementPhase) return
        if (!currentShip) return
        const length = currentShip.getLength();
        const newHighlightedCells = new Set();
      
        // Example: Highlighting horizontally to the right; adjust as needed
        switch (currentDirection) {
            case DIRECTION.RIGHT:
                for (let i = 0; i < length; i++) {
                    newHighlightedCells.add(`${rowIndex},${cellIndex + i}`);
                }
                break;
            case DIRECTION.DOWN:
                for (let i = 0; i < length; i++) {
                    newHighlightedCells.add(`${rowIndex + i},${cellIndex}`);
                }
                break;

        }
        setHighlightedCells(newHighlightedCells);
    };

    const handleMouseLeave = () => {
        setHighlightedCells(new Set());
    };
    

    return (
        <div className={boardClass}>
            {board.map((row, rowIndex) => (
                <BoardRow 
                    key={rowIndex} 
                    row={row} 
                    rowIndex={rowIndex} 
                    handleNextTurn={handleNextTurn} 
                    player={player}
                    isPlacementPhase={isPlacementPhase}
                    currentShip={currentShip}
                    highlightedCells={highlightedCells}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                />
            ))}
        </div>
    );
}
