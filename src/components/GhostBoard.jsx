import React from "react";
import { useState, useEffect } from "react";
import { ScoreBoard } from "./ScoreBoard";

const INITIAL_BOARD = Array(9).fill(null);

export const GhostBoard = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [score, setScore] = useState(0);

  const spawnGhost = () => {
    const newBoard = Array(9).fill(null);
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

  const catchGhost = (index) => {
    if (board[index]) {
      setScore((prev) => prev + 1);
      setBoard((prev) => prev.map((v, i) => (i === index ? null : v)));
    } else {
      alert("Not a ghost! Game over");
      setScore(0);
    }
  };

  return (
    <div>
      <ScoreBoard score={score} />
      <div>
        {board.map((cell, i) => (
          <button key={i} onClick={() => catchGhost(i)}>
            {cell || "❓"}
          </button>
        ))}
      </div>
    </div>
  );
};
