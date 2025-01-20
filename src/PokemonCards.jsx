import React from "react";


const PokemonCard = ({ poke }) => {
  return (
    <div className={`relative bg-white shadow-md rounded-lg flex justify-center items-center  border border-gray-200 w-64 h-64 hover:bg-gray-200 hover:origin-top-left hover:rotate-2 duration-500 `}>
      {/* ID */}
      <div className="absolute top-2 right-2 text-gray-600 text-sm font-semibold px-2 py-1 rounded-md">
        #{poke.id}
      </div>

      {/* Image */}
      <img 
      src={poke.sprites.other.dream_world.front_default}
      alt={"name"}   className="h-32" />

    
        {/* Name */}
        <div className="absolute bottom-3 ">
          <span className="text-xl font-bold text-black ">{(poke.name)}</span>
        </div>
    </div>
  );
};

export default PokemonCard;
