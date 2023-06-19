import React, { useState } from "react";

const symbols = [
  { label: "spades", symbol: "♠" },
  { label: "hearts", symbol: "♥" },
  { label: "diamonds", symbol: "♦" },
  { label: "clubs", symbol: "♣" },
];


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

const sleep = (sec) => {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

function App() {
  const [cards, setCards] = useState(defaultCardData);
  const [state, setState] = useState("Press the card to start a new game!");
  const [gather, setGather] = useState(true);
  const [question, setQuestion] = useState(null);
  const [mode, setMode] = useState("");

  const turnAllCard = (state) => {
    setCards(cards?.map((card) => ({ ...card, open: state })));
  }

  
  const getSymbol = (label) => {
    let result = symbols.find((symbol) => symbol.label === label);
    return result ? result.symbol : label;
  }

  const shuffle = () => {
    let newOrder = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
    return cards?.map((card, index) => ({ ...card, id: newOrder[index] }));
  }

  const startShuffle = async (newQuestion) => {
    for (var i = 0; i < 6; i++) {
      setCards(() => shuffle());    
      await sleep(0.3);
    }
    setState(`Please pick out ${newQuestion.label} ${getSymbol(newQuestion.label)}!!`);
    setMode("answer");
  };

  const startGame = () => {
    setMode("startgame");
    let newQuestion = symbols[parseInt(Math.random() % 3)];
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

    setTimeout(() => {
      startShuffle(newQuestion);
    }, 6000);
  }

  const openCard = (card) => {
    if (mode === "") startGame();
    if (mode !== "answer") return;
    let newCards = cards?.map((c) => (c.id === card.id ? { ...c, open: !c.open } : c));
    setCards(newCards);
    if (card.label === question.label) {
      setState(`🤙🤙🤙🦀  You get the ${question.label} ${getSymbol(question.label)}!!!  🦀🤟🤟🤟`);
    } else {
      setState("👎👎👎🐧 You lose!!! 🐧 👎👎👎");
      let card = cards?.find((c) => c.label === question.label);
      setTimeout(() => {
        let newCards = cards?.map((c) => (c.id === card.id ? { ...c, open: true } : c));
        setCards(newCards);
      }, 1000);
    }
    setTimeout(startGame, 3000);
  }



  return (
    <div className="control">
        <div className="btnContainer">
          <div className="gather">
            <input type="checkbox" id="gatherControl" checked={gather} onChange={(e) => setGather(e.target.checked)} />
            <label htmlFor="gatherControl">Gather</label>
          </div>
          <button onClick={() => shuffle()}>Shuffle</button>
          <button onClick={startGame}>Start Game</button>
        </div>
      <div>
        <p className="state">{state}</p>
      </div>
      <div>
        <ul className={`cards ${gather ? 'gather' : ''}`}>
          {cards?.map((card) => (
            <li
              className={`card ${card.open ? 'open' : ''}`}
              data-order={card.id}
              key={card.label}
              onClick={() => openCard(card)}
            >
              <div className="face back"></div>
              {
                card.open ? (
                  <>
                    <div className="face front">{getSymbol(card.label)}</div>
                    <p style={{ display: 'absolute', zIndex: 999 }}>{card.id}</p>
                  </>
                ) : (
                  <></>              
                )
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
 