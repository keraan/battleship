import React from "react";
import Game from "./Game";
import AttackInput from "./AttackInput";

type ControlsProps = {
    game: Game
    handleNextTurn: (row: number, col: number) => void
}
export default function Controls({game, handleNextTurn}: ControlsProps) {
    return (
        <div className="control-panel">
            <AttackInput handleNextTurn={handleNextTurn}/>
            {/* <button onClick={() => {}}>Next turn</button> */}
        </div>
    )
}