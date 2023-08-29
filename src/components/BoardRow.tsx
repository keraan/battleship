import React from "react";

import BoardCell from "./Board-cell";
import Player from "./Player";
import Ship from "./Ship";

type BoardRowProps = {
    row: number[]
    rowIndex: number
    handleNextTurn: (row: number, col: number, playerId: number) => void
    player: Player
    isPlacementPhase: boolean
    currentShip: Ship | null
    highlightedCells: any
    handleMouseEnter: (rowIndex: number, cellIndex: number) => void
    handleMouseLeave: () => void
}

export default function BoardRow({row, rowIndex, handleNextTurn, player, isPlacementPhase, currentShip, highlightedCells, handleMouseEnter, handleMouseLeave}: BoardRowProps) {
    return (
        <div className="board-row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
                <BoardCell 
                    key={cellIndex} 
                    cell={cell} 
                    cellIndex={cellIndex} 
                    rowIndex={rowIndex} 
                    handleNextTurn={handleNextTurn}
                    player={player}
                    isHighlighted={highlightedCells.has(`${rowIndex},${cellIndex}`)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                    onMouseLeave={handleMouseLeave}
                />
            ))}
        </div>
    )
}