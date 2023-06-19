import React, { useState } from "react";

const symbols = [
  { label: "spades", symbol: "♠" },
  { label: "hearts", symbol: "♥" },
  { label: "diamonds", symbol: "♦" },
  { label: "clubs", symbol: "♣" },
];

function getSymbol(label) {
  let result = symbols.find((symbol) => symbol.label === label);
  return result ? result.symbol : label;
}

function shuffle(cards) {
  let newOrder = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
  return cards.map((card, index) => ({ ...card, id: newOrder[index] }));
}

function Card({ label, open, onClick }) {
  return (
    <div className={`card ${open ? "open" : ""}`} onClick={onClick}>
      <span>{getSymbol(label)}</span>
    </div>
  );
}


function App() {
    const [cards, setCards] = useState([
    {
      id: 1,
      label: "spades",
      open: false,
    },
    {
      id: 2,
      label: "hearts",
      open: false,
    },
    {
      id: 3,
      label: "clubs",
      open: false,
    },
    {
      id: 4,
      label: "diamonds",
      open: false,
    },
  ]);

  return (
    <div className="App">
    </div>
  );
}

export default App;
