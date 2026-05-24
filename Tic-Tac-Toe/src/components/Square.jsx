import React from "react";

const Square = ({ value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-24 h-24 md:w-28 md:h-28
        rounded-2xl
        text-5xl font-bold
        flex items-center justify-center
        transition-all duration-300
        shadow-lg
        border border-white/10
        backdrop-blur-md
        
        ${
          value === "X"
            ? "text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20"
            : value === "O"
            ? "text-pink-400 bg-pink-500/10 hover:bg-pink-500/20"
            : "text-white bg-white/5 hover:bg-white/10"
        }
      `}
    >
      {value}
    </button>
  );
};

export default Square;