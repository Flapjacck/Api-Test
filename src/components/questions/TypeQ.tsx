import React, { useEffect, useState } from "react";
import { PokemonClient } from "pokenode-ts";

const TypeQ: React.FC<{
  onScoreUpdate: () => void;
  onWrongAnswer: () => void;
}> = ({ onScoreUpdate, onWrongAnswer }) => {
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [correctTypes, setCorrectTypes] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [questionKey, setQuestionKey] = useState(0); // State to force re-render

  useEffect(() => {
    fetchPokemon();
  }, [questionKey]); // Re-fetch Pokémon when `questionKey` changes

  const fetchPokemon = async () => {
    setLoading(true);
    setMessage("");

    try {
      const api = new PokemonClient();
      const randomId = Math.floor(Math.random() * 1025) + 1;
      const pokemon = await api.getPokemonById(randomId);

      const pokemonImageUrl = pokemon.sprites.front_default || "";
      const pokemonTypes = pokemon.types.map((t) => t.type.name);

      setPokemonImage(pokemonImageUrl);
      setCorrectTypes(pokemonTypes);

      const allTypes = [
        "normal",
        "fire",
        "water",
        "electric",
        "grass",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy",
      ];

      const incorrectTypes = allTypes
        .filter((t) => !pokemonTypes.includes(t))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3); // Only 3 incorrect types to keep total options 4

      const correctTypeCombination = pokemonTypes.join("/");

      const incorrectTypeCombinations = incorrectTypes.map((type) => {
        const secondType =
          allTypes[Math.floor(Math.random() * allTypes.length)];
        return type !== secondType
          ? `${type}/${secondType}`
          : `${type}/${allTypes.find((t) => t !== type)}`;
      });

      const mixedOptions = [
        ...incorrectTypes,
        ...incorrectTypeCombinations,
        correctTypeCombination,
      ]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      // Ensure the correct answer is included
      if (!mixedOptions.includes(correctTypeCombination)) {
        mixedOptions[Math.floor(Math.random() * mixedOptions.length)] =
          correctTypeCombination;
      }

      setOptions(mixedOptions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setMessage("Failed to load Pokémon. Try again.");
      setLoading(false);
    }
  };

  const handleAnswer = (selectedType: string) => {
    if (selectedType === correctTypes.join("/")) {
      setMessage("Correct! 🎉");
      onScoreUpdate(); // Increment score
    } else {
      setMessage(
        `Wrong! The correct answer was ${correctTypes
          .join(" and ")
          .toUpperCase()}.`
      );
      onWrongAnswer(); // Reset score and go back to title screen
    }

    // Force re-render by updating `questionKey`
    setTimeout(() => setQuestionKey((prev) => prev + 1), 1500);
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">What type is this Pokémon?</h2>
      {loading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <>
          <img
            src={pokemonImage}
            alt="Pokémon"
            className="w-40 h-40 mx-auto mb-4"
          />
          <div className="grid grid-cols-2 gap-4">
            {options.map((type) => (
              <button
                key={type}
                onClick={() => handleAnswer(type)}
                className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-red-400"
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="mt-4 text-lg">{message}</p>
        </>
      )}
    </div>
  );
};

export default TypeQ;
