import React, { useEffect, useState } from "react";
import { PokemonClient } from "pokenode-ts";

const WhoDatQ: React.FC<{
  onScoreUpdate: () => void;
  onWrongAnswer: () => void;
}> = ({ onScoreUpdate, onWrongAnswer }) => {
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [correctName, setCorrectName] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [questionKey, setQuestionKey] = useState(0); // Forces re-render

  useEffect(() => {
    fetchPokemon();
  }, [questionKey]);

  const fetchPokemon = async () => {
    setLoading(true);
    setMessage("");

    try {
      const api = new PokemonClient();
      const randomId = Math.floor(Math.random() * 1025) + 1; // Random Pokémon ID (1-1025)
      const pokemon = await api.getPokemonById(randomId);

      const sprite =
        pokemon.sprites.other?.["official-artwork"].front_default || "";
      const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalized

      // Fetch random Pokémon names for incorrect options
      const incorrectNames = new Set<string>();
      while (incorrectNames.size < 3) {
        const randomIncorrectId = Math.floor(Math.random() * 1025) + 1;
        if (randomIncorrectId !== randomId) {
          const incorrectPokemon = await api.getPokemonById(randomIncorrectId);
          const incorrectName =
            incorrectPokemon.name.charAt(0).toUpperCase() +
            incorrectPokemon.name.slice(1);
          incorrectNames.add(incorrectName);
        }
      }

      // Ensure the correct answer is included
      const allOptions = [...incorrectNames, name];

      // Shuffle the options to ensure randomness
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

      // Update state variables
      setCorrectName(name);
      setOptions(shuffledOptions);
      setPokemonImage(sprite);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setMessage("Failed to load Pokémon. Try again.");
      setLoading(false);
    }
  };

  const handleAnswer = (selectedName: string) => {
    if (selectedName === correctName) {
      setMessage("Correct! 🎉");
      onScoreUpdate(); // Increment score
    } else {
      setMessage(`Wrong! The correct answer was ${correctName}.`);
      onWrongAnswer(); // Reset score and go back to title screen
    }

    // Load a new Pokémon after a short delay
    setTimeout(() => setQuestionKey((prev) => prev + 1), 1500);
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Who's That Pokémon?</h2>
      {loading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <>
          <div className="flex justify-center">
            <img
              src={pokemonImage}
              alt="Mystery Pokémon"
              className="w-40 h-40 mx-auto mb-4 filter blur-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {options.map((name) => (
              <button
                key={name}
                onClick={() => handleAnswer(name)}
                className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-red-400"
              >
                {name}
              </button>
            ))}
          </div>
          <p className="mt-4 text-lg">{message}</p>
        </>
      )}
    </div>
  );
};

export default WhoDatQ;
