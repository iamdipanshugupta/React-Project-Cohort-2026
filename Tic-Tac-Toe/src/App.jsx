import React, { useState } from "react";
import Board from "./components/Board";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function calculateWinner(board) {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }

    return null;
  }

  const winner = calculateWinner(board);

  const isDraw =
    !winner && board.every((cell) => cell !== null);

  function handleClick(index) {
    if (board[index] || winner) return;

    const updatedBoard = [...board];

    updatedBoard[index] = isXTurn ? "X" : "O";

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  return (
    <div className="
      min-h-screen
      relative
      overflow-hidden
      bg-black
      flex
      items-center
      justify-center
      px-4
    ">

      {/* Background Glow */}
      <div className="
        absolute
        w-[500px]
        h-[500px]
        bg-cyan-500/20
        rounded-full
        blur-3xl
        top-[-100px]
        left-[-100px]
      "></div>

      <div className="
        absolute
        w-[400px]
        h-[400px]
        bg-pink-500/20
        rounded-full
        blur-3xl
        bottom-[-100px]
        right-[-100px]
      "></div>

      {/* Main Card */}
      <div className="
        relative
        z-10
        w-full
        max-w-lg
        bg-white/5
        border border-white/10
        backdrop-blur-2xl
        rounded-[32px]
        p-8
        shadow-2xl
      ">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="
            text-5xl
            md:text-6xl
            font-extrabold
            text-white
            tracking-wide
          ">
            Tic Tac Toe
          </h1>

          <p className="
            mt-3
            text-gray-400
            text-lg
          ">
            Play the classic X & O game
          </p>

        </div>

        {/* Status */}
        <div className="
          mb-8
          bg-white/5
          border border-white/10
          rounded-2xl
          py-4
          text-center
        ">

          {winner ? (
            <div className="
              text-3xl
              font-bold
              text-green-400
              animate-pulse
            ">
              🎉 Winner : {winner}
            </div>
          ) : isDraw ? (
            <div className="
              text-3xl
              font-bold
              text-yellow-400
            ">
              🤝 Match Draw
            </div>
          ) : (
            <div className="
              text-xl
              text-white
            ">
              Current Turn :
              <span
                className={`ml-2 font-bold ${
                  isXTurn
                    ? "text-cyan-400"
                    : "text-pink-400"
                }`}
              >
                {isXTurn ? "X" : "O"}
              </span>
            </div>
          )}

        </div>

        {/* Board */}
        <div className="flex justify-center">
          <Board
            board={board}
            handleClick={handleClick}
          />
        </div>

        {/* Button */}
        <button
          onClick={resetGame}
          className="
            w-full
            mt-8
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            text-white
            text-lg
            font-semibold
            hover:scale-105
            active:scale-95
            transition-all
            duration-300
            shadow-lg
            shadow-cyan-500/30
          "
        >
          🔄 Restart Game
        </button>

        {/* Footer */}
        <p className="
          text-center
          text-gray-500
          text-sm
          mt-6
        ">
          Built with React & Tailwind CSS
        </p>

      </div>
    </div>
  );
};

export default App;