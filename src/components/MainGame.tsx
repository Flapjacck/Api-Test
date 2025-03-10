import { useState, useEffect } from "react";
import TypeQ from "./TypeQ";
import Score from "./Score";
import PokedexQ from "./PokedexQ";

const MainGame: React.FC<{ onGameOver: () => void }> = ({ onGameOver }) => {
  const [questionType, setQuestionType] = useState<"type" | "pokedex">(
    Math.random() > 0.5 ? "type" : "pokedex"
  );
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedHighestScore = localStorage.getItem("highestScore");
    if (savedHighestScore) {
      setHighestScore(parseInt(savedHighestScore, 10));
    }
  }, []);

  const handleScoreUpdate = () => {
    setScore((prevScore) => {
      const newScore = prevScore + 1;
      if (newScore > highestScore) {
        setHighestScore(newScore);
        localStorage.setItem("highestScore", newScore.toString());
      }
      return newScore;
    });

    // Delay the question type change to show the result message
    setTimeout(() => {
      const nextQuestionType = Math.random() > 0.5 ? "type" : "pokedex";
      setQuestionType(nextQuestionType);
      setMessage("");
    }, 1500); // 1.5 seconds delay
  };

  const handleWrongAnswer = () => {
    setMessage("Wrong! Returning to the title screen...");
    setTimeout(() => {
      setScore(0);
      onGameOver();
    }, 1500); // 1.5 seconds delay
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Score score={score} highestScore={highestScore} />
      {message && <p className="text-lg mb-4">{message}</p>}
      {questionType === "type" ? (
        <TypeQ
          onScoreUpdate={handleScoreUpdate}
          onWrongAnswer={handleWrongAnswer}
        />
      ) : (
        <PokedexQ
          onScoreUpdate={handleScoreUpdate}
          onWrongAnswer={handleWrongAnswer}
        />
      )}
    </div>
  );
};

export default MainGame;
