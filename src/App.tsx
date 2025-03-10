import { useState } from "react";
import TitleScreen from "./components/TitleScreen";
import MainGame from "./components/MainGame";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameOver = () => {
    setGameStarted(false);
  };

  return (
    <>
      {gameStarted ? (
        <MainGame onGameOver={handleGameOver} />
      ) : (
        <TitleScreen onStart={() => setGameStarted(true)} />
      )}
    </>
  );
}

export default App;
