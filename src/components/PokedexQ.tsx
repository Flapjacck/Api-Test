import React, { useEffect, useState } from "react";
import { PokemonClient } from "pokenode-ts";

const PokedexQ: React.FC<{
  onScoreUpdate: () => void;
  onWrongAnswer: () => void;
}> = ({ onScoreUpdate, onWrongAnswer }) => {
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [pokemonId, setPokemonId] = useState<number>(0);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [questionKey, setQuestionKey] = useState(0); // Forces component re-render

  useEffect(() => {
    fetchPokemon();
  }, [questionKey]);

  const fetchPokemon = async () => {
    setLoading(true);
    setMessage("");

    try {
      const api = new PokemonClient();
      const randomId = Math.floor(Math.random() * 1025) + 1; // Get a random Pokémon ID
      const pokemon = await api.getPokemonById(randomId);

      setPokemonImage(pokemon.sprites.front_default || "");
      setPokemonId(randomId);

      // Generate a random incorrect Pokédex number that is NOT the correct one
      let generatedNumber;
      do {
        generatedNumber = Math.floor(Math.random() * 1025) + 1;
      } while (generatedNumber === randomId); // Ensure it is not the correct number

      setRandomNumber(generatedNumber);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setMessage("Failed to load Pokémon. Try again.");
      setLoading(false);
    }
  };

  const handleGuess = (guess: "higher" | "lower") => {
    const isCorrect =
      (guess === "higher" && pokemonId > randomNumber) ||
      (guess === "lower" && pokemonId < randomNumber);

    if (isCorrect) {
      setMessage("Correct! 🎉");
      onScoreUpdate(); // Increment score
    } else {
      setMessage(`Wrong! ${pokemonId} is the actual Pokédex number.`);
      onWrongAnswer(); // Reset score and go back to title screen
    }

    // Load a new Pokémon after a short delay
    setTimeout(() => setQuestionKey((prev) => prev + 1), 1500);
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">
        Is the Pokédex number higher or lower?
      </h2>
      {loading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <>
          <img
            src={pokemonImage}
            alt="Pokémon"
            className="w-40 h-40 mx-auto mb-4"
          />
          <p className="text-lg mb-4">
            Random Pokédex Number: <strong>{randomNumber}</strong>
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => handleGuess("higher")}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-400"
            >
              Higher
            </button>
            <button
              onClick={() => handleGuess("lower")}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-400"
            >
              Lower
            </button>
          </div>
          <p className="mt-4 text-lg">{message}</p>
        </>
      )}
    </div>
  );
};

export default PokedexQ;
