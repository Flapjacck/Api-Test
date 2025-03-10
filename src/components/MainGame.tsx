import { useState, useEffect } from "react";
import TypeQ from "./TypeQ"; // Import question type component
import Score from "./Score"; // Import Score component

const MainGame: React.FC = () => {
  const [questionType] = useState("type"); // Change based on logic
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

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
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Score score={score} highestScore={highestScore} />
      {questionType === "type" && <TypeQ onScoreUpdate={handleScoreUpdate} />}
      {/* You can add more question types here */}
    </div>
  );
};

export default MainGame;
