import React, { useState } from "react";
import PokemonCard from "./PokemonCards";
import logo from "./assets/pokeball.svg";
import image from "./assets/search.svg";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  useState(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();

        const pokemonDetails = data.results.map(async (poke) => {
          const res = await fetch(poke.url);
          const pokeData = await res.json();
          return pokeData;
        });
        const detailsResponse = await Promise.all(pokemonDetails);
        setPokemon(detailsResponse);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  const searchData = pokemon.filter((poke) => {
    const name = poke.name.toLowerCase();
    const searchLower = search.toLowerCase();

    // Check if the `name` and `search` match character by character
    for (let i = 0; i < searchLower.length; i++) {
      if (name[i] !== searchLower[i]) {
        return false;
      }
    }
    return true;
  });

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
            {error.message}
          </h1>
        </div>
      );
    } else {
      return (
        <main>
          <nav className="bg-[#dc0a2d] p-4 pb-6 px-8 shadow-md">
            <div className="container mx-auto flex flex-col gap-5 ">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <img src={logo} alt="Pokedex Logo" className="h-8 w-8" />
                <span className="text-2xl font-extrabold text-white ">
                  {"POKEMON CARDS"}
                </span>
              </div>

              {/* Search Bar */}
              <div className="flex px-4 bg-gray-100 rounded-2xl">
                <p className="flex justify-center items-center">
                  <img src={image} alt="search img" className="w-4 h-4" />
                </p>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search Pokemon..."
                  className="w-full p-2  border-none focus:outline-none  bg-gray-100"
                />
              </div>
            </div>
          </nav>

          <div className="w-full h-full ">
            <ul className=" py-4 px-2 md:pt-10 md:px-10 flex flex-wrap justify-center gap-4 md:gap-6 bg-gray-100">
              { searchData.map((poke, i) => {
                return <PokemonCard key={i} poke={poke} />;
              })
           }
            </ul>
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
export default Pokemon;
