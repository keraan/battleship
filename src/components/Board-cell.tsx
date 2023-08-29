import React, { useState, useEffect } from "react";
import Player from "./Player";
import Ship from "./Ship";

type BoardCellProps = {
    cell: number
    cellIndex: number
    rowIndex: number
    handleNextTurn: (row: number, col: number, playerId: number) => void
    player: Player
    isHighlighted: boolean
    onMouseEnter: () => void;  // Add this line
    onMouseLeave: () => void;  // Add this line
}

export default function BoardCell({cell, cellIndex, rowIndex, handleNextTurn, player, isHighlighted, onMouseEnter, onMouseLeave}: BoardCellProps) {
    let boardCellClass = isHighlighted ? "board-cell highlighted" : "board-cell";
    // useEffect(() => {
    //     if (cell < 0) {
    //         if (cell === -8) {
    //             boardCellClass = ("board-cell miss");
    //         } else {
    //             boardCellClass = ("board-cell hit");
    //         }
    //     }
    // }, [cell]); // Only re-run the effect if `cell` changes
    if (cell > 0 && cell <= 5 && player.getId() === 1) {
        boardCellClass = "board-cell ship"
    }
    if (cell < 0) {
        if (cell === -8) {
            boardCellClass = ("board-cell miss");
        } else {
            boardCellClass = ("board-cell hit");
        }
    }


    return (
        // Cell index is the column
        // Cell is the value inside it
        <div 
            className={boardCellClass} 
            key={cellIndex} 
            onClick={() => handleNextTurn(rowIndex, cellIndex, player.getId())}
            // onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseEnter}
        >
            {/* {cell} */}
        </div>
    )
}