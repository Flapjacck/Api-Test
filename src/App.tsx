import { useState } from "react";
import TitleScreen from "./components/TitleScreen";
import MainGame from "./components/MainGame";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      {gameStarted ? (
        <MainGame />
      ) : (
        <TitleScreen onStart={() => setGameStarted(true)} />
      )}
    </>
  );
}

export default App;
