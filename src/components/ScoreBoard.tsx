import React from "react";

interface ScoreBoardProps {
  score: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return <h2>Ghosts busted: {score}</h2>;
};

