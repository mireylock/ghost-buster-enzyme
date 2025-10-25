import React, { useState, useEffect } from "react";
import { ScoreBoard } from "./ScoreBoard";
import { CellContent } from "../types/GhostBoard.types";
import "./GhostBoard.css";

const INITIAL_BOARD: CellContent[] = Array(9).fill(null);

export const GhostBoard: React.FC = () => {
  const [board, setBoard] = useState<CellContent[]>(INITIAL_BOARD);
  const [score, setScore] = useState<number>(0);

  const spawnGhost = () => {
    const newBoard: CellContent[] = Array(9).fill(null);
    const randomIndex = Math.floor(Math.random() * newBoard.length);
    newBoard[randomIndex] = "👻";
    setBoard(newBoard);

    setTimeout(() => {
      setBoard((prev) => prev.map((v, i) => (i === randomIndex ? null : v)));
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(spawnGhost, 2000);
    return () => clearInterval(interval);
  }, []);

  const catchGhost = (index: number) => {
    if (board[index]) {
      setScore((prev) => prev + 1);
      setBoard((prev) => prev.map((v, i) => (i === index ? null : v)));
    } else {
      alert("Not a ghost! Game over");
      setScore(0);
    }
  };

  return (
    <div id="container">
      <ScoreBoard score={score} />
      <div id="boardContainer">
        {board.map((cell, i) => (
          <button className="button" key={i} onClick={() => catchGhost(i)}>
            {cell || "❓"}
          </button>
        ))}
      </div>
    </div>
  );
};
