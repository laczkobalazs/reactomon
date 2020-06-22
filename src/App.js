import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import axios from "axios";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [initialUrl, setInitialUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(initialUrl).then((response) => {
      setPokemonData(response.data.results.map((p) => p.name));
    });
  }, [initialUrl]);

  const loadingPokemon = async (data) => {
    let allPokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await axios.get(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(allPokemonData);
  };

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid-container">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
