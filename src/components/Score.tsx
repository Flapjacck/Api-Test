import React from "react";

interface ScoreProps {
  score: number;
  highestScore: number;
}

const Score: React.FC<ScoreProps> = ({ score, highestScore }) => {
  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold">Score: {score}</h2>
      <h2 className="text-xl font-bold">Highest Score: {highestScore}</h2>
    </div>
  );
};

export default Score;
