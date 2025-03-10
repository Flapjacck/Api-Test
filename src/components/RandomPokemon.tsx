import { useState, useEffect } from "react";
import { PokemonClient } from "pokenode-ts";

const RandomPokemon = () => {
  const [pokemon, setPokemon] = useState<{
    name: string;
    sprite: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    const api = new PokemonClient();
    const randomId = Math.floor(Math.random() * 1025) + 1;
    try {
      const data = await api.getPokemonById(randomId);
      setPokemon({ name: data.name, sprite: data.sprites.front_default || "" });
    } catch (error) {
      console.error("Failed to fetch Pokémon", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-yellow-300 p-6 rounded-lg shadow-xl w-64 border-4 border-red-500">
      <h1 className="text-xl font-bold text-red-700 mb-4">Random Pokémon</h1>
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        pokemon && (
          <div className="flex flex-col items-center">
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-32 h-32 mb-2 border-4 border-black bg-white rounded-lg"
            />
            <p className="text-lg font-semibold capitalize text-blue-700">
              {pokemon.name}
            </p>
          </div>
        )
      )}
      <button
        onClick={fetchRandomPokemon}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Generate A New Pokémon
      </button>
    </div>
  );
};

export default RandomPokemon;
