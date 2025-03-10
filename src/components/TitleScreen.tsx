import React from "react";

interface TitleScreenProps {
  onStart: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4">Who's That Pokémon?</h1>
      <button
        onClick={onStart}
        className="bg-yellow-400 text-black px-6 py-2 rounded-full text-xl font-semibold hover:bg-yellow-300"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default TitleScreen;
