// import React from "react";

import BoardCell from "./Board-cell";
import Player from "./Player";

type BoardRowProps = {
    row: number[]
    rowIndex: number
    handleNextTurn: (row: number, col: number, playerId: number) => void
    player: Player
    highlightedCells: any
    handleMouseEnter: (rowIndex: number, cellIndex: number) => void
    handleMouseLeave: () => void
}

export default function BoardRow({row, rowIndex, handleNextTurn, player, highlightedCells, handleMouseEnter, handleMouseLeave}: BoardRowProps) {
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