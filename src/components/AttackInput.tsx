import React, { useState } from "react";

type AttackInputProps = {
    handleNextTurn: (row: number, col: number) => void
}

export default function AttackInput({handleNextTurn}: AttackInputProps) {
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Code to handle the attack
    // For example, you might call a function like this: attack(row, col)
    console.log(`Attacking row ${row}, column ${col}`);
    handleNextTurn(parseInt(row), parseInt(col))
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Row:
        <input
          type="number"
          value={row}
          onChange={(e) => setRow(e.target.value)}
          min="0"
          max="6"
          required
        />
      </label>
      <label>
        Column:
        <input
          type="number"
          value={col}
          onChange={(e) => setCol(e.target.value)}
          min="0"
          max="6"
          required
        />
      </label>
      <button type="submit">Attack!</button>
    </form>
  );
}