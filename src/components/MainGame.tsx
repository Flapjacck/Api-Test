import { useState, useEffect } from "react";
import TypeQ from "./TypeQ";
import Score from "./Score";
import PokedexQ from "./PokedexQ";
import WhoDatQ from "./WhoDatQ";

const MainGame: React.FC<{ onGameOver: () => void }> = ({ onGameOver }) => {
  const [questionType, setQuestionType] = useState<
    "type" | "pokedex" | "whodat"
  >(() => {
    const types: ("type" | "pokedex" | "whodat")[] = [
      "type",
      "pokedex",
      "whodat",
    ];
    return types[Math.floor(Math.random() * types.length)];
  });

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
      const types: ("type" | "pokedex" | "whodat")[] = [
        "type",
        "pokedex",
        "whodat",
      ];
      setQuestionType(types[Math.floor(Math.random() * types.length)]);
      setMessage("");
    }, 1500);
  };

  const handleWrongAnswer = () => {
    setMessage("Wrong! Returning to the title screen...");
    setTimeout(() => {
      setScore(0);
      onGameOver();
    }, 1500);
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
      ) : questionType === "pokedex" ? (
        <PokedexQ
          onScoreUpdate={handleScoreUpdate}
          onWrongAnswer={handleWrongAnswer}
        />
      ) : (
        <WhoDatQ
          onScoreUpdate={handleScoreUpdate}
          onWrongAnswer={handleWrongAnswer}
        />
      )}
    </div>
  );
};

export default MainGame;
