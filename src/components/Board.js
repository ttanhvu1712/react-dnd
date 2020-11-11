import React from "react";
import Square from "./Square";
import Knight from "./Knight";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { moveKnight, canMoveKnight } from "../Game";

const Board = ({ knightPosition }) => {
  const clickHandler = (toX, toY) => {
    if (canMoveKnight(toX, toY)) {
      moveKnight(toX, toY);
    }
  };

  const renderSquare = (i, [knightX, knightY]) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const isKnightHere = x === knightX && y === knightY;
    const black = (x + y) % 2 === 1;
    const piece = isKnightHere ? <Knight /> : null;

    return (
      <div
        key={i}
        style={{ width: "12.5%", height: "12.5%" }}
        onClick={() => clickHandler(x, y)}
      >
        <Square black={black}>{piece}</Square>
      </div>
    );
  };

  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
};

export default Board;
