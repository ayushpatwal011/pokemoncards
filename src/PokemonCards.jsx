import React from "react";
import {useNavigate} from "react-router-dom"

const PokemonCard = ({ poke }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`pokemon/${id}`)
  }

  return (
    <div
    onClick={() => handleClick(poke.id)}
     className={`relative bg-white shadow-md rounded-lg flex justify-center items-center  border border-gray-200 w-36 h-36  md:w-64 md:h-64 hover:bg-gray-200 hover:origin-top-left hover:rotate-2 duration-500 `}>
      {/* ID */}
      <div className="absolute top-2 right-2 text-gray-600 text-sm font-semibold px-2 py-1 rounded-md">
        #{poke.id}
      </div>

      {/* Image */}
      <img 
      src={poke.sprites.other.dream_world.front_default}
      alt={"name"} className="h-20 md:h-32" />

    
        {/* Name */}
        <div className="absolute bottom-2 md:bottom-3 ">
          <span className="text-base md:text-xl font-bold text-black ">{(poke.name)}</span>
        </div>
    </div>
  );
};

export default PokemonCard;
