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

const defaultCardData = [
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
];

function App() {
  const [cards, setCards] = useState(defaultCardData);
  const [state, setState] = useState("Press the card to start a new game!");
  const [gather, setGather] = useState(true);
  const [question, setQuestion] = useState(null);
  const [mode, setMode] = useState("");
  const [count, setCount] = useState(0);

  function turnAllCard(state) {
    setCards(cards.map((card) => ({ ...card, open: state })));
  }

  let startShuffle = () => {
    let newCards = shuffle(cards);
    setCards(newCards);
    if (count < 6) {
      setTimeout(() => setCount(count + 1), 300);
    } else {
      setState(`Please pick out ${question.label} ${getSymbol(question.label)}!!`);
      setMode("answer");
    }
  };

  function startGame() {
    setMode("startgame");
    let newQuestion = symbols[parseInt(Math.random() * 3)];
    setQuestion(newQuestion);
    turnAllCard(false);
    setGather(true);
    setState("Ready...");
    setTimeout(() => {
      setGather(false);
      setState("Your mission is...");
    }, 1000);
    setTimeout(() => {
      turnAllCard(true);
      setState(`Find ${newQuestion.label} ${getSymbol(newQuestion.label)}!!`);
    }, 2000);
    setTimeout(() => {
      turnAllCard(false);
      setState(`Get Ready...`);
    }, 4000);

    setCount(0);
    setTimeout(() => {
      startShuffle();
    }, 6000);
  }

  function openCard(card) {
    if (mode === "") startGame();
    if (mode !== "answer") return;
    let newCards = cards.map((c) => (c.id === card.id ? { ...c, open: !c.open } : c));
    setCards(newCards);
    if (card.label === question.label) {
      setState(`🤙🤙🤙🦀  You get the ${question.label} ${getSymbol(question.label)}!!!  🦀🤟🤟🤟`);
    } else {
      setState("👎👎👎🐧 You lose!!! 🐧 👎👎👎");
      let card = cards.find((c) => c.label === question.label);
      setTimeout(() => {
        let newCards = cards.map((c) => (c.id === card.id ? { ...c, open: true } : c));
        setCards(newCards);
      }, 1000);
    }
    setTimeout(startGame, 3000);
  }


  return (
    <div className="App">
      {cards.map((card) => (
        <Card key={card.id} label={card.label} open={card.open} onClick={() => openCard(card)} />
      ))}
      <div className={`state ${gather ? "gather" : ""}`}>{state}</div>
    </div>
  );
}

export default App;
