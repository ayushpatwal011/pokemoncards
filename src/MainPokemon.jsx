import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pokedex from "./assets/pokedex.svg";
// Import specific icons
import {  FaRulerVertical,   FaIdBadge, FaWeight } from 'react-icons/fa'; // FontAwesome
import { GiMuscleUp } from 'react-icons/gi'; // Game Icons
import { MdOutlineCategory } from 'react-icons/md'; // Material Design Icons

const MainPokemon = () => {
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const PokemonApi = `https://pokeapi.co/api/v2/pokemon/${id}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(PokemonApi);
        const data = await res.json();
        setPokemonData(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pokemonData]);

  const colours = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
  };

  const getBackgroundColor = () => {
    if (pokemonData && pokemonData.types.length > 0) {
      const primaryType = pokemonData.types[0].type.name;
      return colours[primaryType] || "#FF0000";
    }
    flex - 1;
    return "black";
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-200">
        <h1 className="text-black font-extrabold text-lg md:text-5xl">
          Loading...
        </h1>
      </div>
    );
  } else {
    if (error) {
      return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-200">
          <h1 className="text-black font-extrabold text-lg md:text-5xl">
            {error ? error.message : "Error"}
          </h1>
        </div>
      );
    } else {
      return (
        <main>
          <div
            className="relative px-6 py-5 w-full min-h-screen"
            style={{ backgroundColor: getBackgroundColor() }}
          >
            <div className="text-white font-extrabold flex justify-between">
              <button
                onClick={() => {
                  navigate(`/`);
                }}
                className="bg-black rounded-md px-3 py-2"
              >
                &lt;
              </button>
            </div>
            <img
              className="absolute right-8 top-8  opacity-10 "
              src={pokedex}
              alt=""
            />
            <div className="w-full ">
              <img
                className="mx-auto my-4 w-60 h-60 "
                src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`}
                alt={pokemonData.name}
              />
              <div className=" w-full md:w-96 px-4 text-black bg-gray-200 p-4 shadow-lg rounded-xl mx-auto">
              <p  className="flex items-center py-1 gap-2">
              <FaIdBadge />
                  <strong>ID:</strong> {pokemonData.id}
                </p>
                <p  className="flex items-center py-1 gap-2">
                <FaRulerVertical  />
                  <strong>HEIGHT:</strong> {pokemonData.height}
                </p>
                <p  className="flex items-center py-1 gap-2">
                  <FaWeight/>
                  <strong> WEIGHT:</strong> {pokemonData.weight}
                </p>
                <p  className="flex items-center py-1 gap-2">
                <MdOutlineCategory  />
                  <strong>TYPE:</strong>{" "}
                  {pokemonData.types[0].type.name.toUpperCase()}
                </p>
                <p  className="flex items-center py-1 gap-2">
                <GiMuscleUp  />
                  <strong>ABILITIES:</strong>{" "}
                  {pokemonData.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </p>
                <div className="pt-3">
                  <h1 className="font-xl text-center text-black font-bold">Base Stats</h1>
                  <div className="mt-4 space-y-2">
                {pokemonData.stats.map((stat) => {
                  const percentage = Math.min(
                    (stat.base_stat / 100) * 100,
                    100
                  ); 
                  return (
                    <div
                      key={stat.stat.name}
                      className="flex items-center space-x-4"
                    >
                      <span className="w-20 text-right capitalize">
                        {stat.stat.name}
                      </span>
                      <div className="flex-1 bg-gray-700 rounded">
                        <div
                          className="h-4 bg-green-500 rounded"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: getBackgroundColor(),
                          }}
                        ></div>
                      </div>
                      <span className="ml-2">{stat.base_stat}</span>
                    </div>
                  );
                })}
              </div>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <p className="w-full fixed bottom-0 text-center text-gray-900 bg-white text-sm">
              {"�� Created By: Ayush Patwal. All rights reserved."}
            <a
            className="text-blue-700 font-bold cursor-pointer"
            href="https://github.com/ayushpatwal011"> GitHub-Link 
            </a>
            </p>
            </footer>
        </main>
      );
    }
  }
};

export default MainPokemon;

// <div>
//   <h1>{pokemonData.name}</h1>
//   <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
//   <h2>Abilities:</h2>
//   <ul>
//     {pokemonData.abilities.map((ability, index) => (
//       <li key={index}>{ability.ability.name}</li>
//     ))}
//   </ul>
//   <h2>Types:</h2>
//   <ul>
//     {pokemonData.types.map((type, index) => (
//       <li key={index}>{type.type.name}</li>
//     ))}
//   </ul>
//   <h2>Stats:</h2>
//   <ul>
//     {pokemonData.stats.map((stat, index) => (
//       <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
//     ))}
//   </ul>
// </div>
