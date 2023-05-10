
import { useState } from 'react';
import './App.css';
import Card from './Card'

const unshuffledDeck = ['heart', 'diamond', 'club', 'spade'].flatMap(suit => Array.from(Array(13).keys()).map(k => ({
  value: k + 1,
  suit,
  live: true,
})));

function shuffle(deck) {
  for (let i = 0; i < 52; i++) {
    const newCardIndex = Math.floor(Math.random() * (51-i)) + i;
    const temp = deck[i];
    deck[i] = deck[newCardIndex];
    deck[newCardIndex] = temp;
  }

  return deck;
}

const initialDeck = shuffle(unshuffledDeck);

function App() {
  const [deck, setDeck] = useState(initialDeck.slice(9, initialDeck.length))
  const [stacks, setStacks] = useState(initialDeck.slice(0,9).map(c => [c]));

  function placeCard(index, over) {
    const newStack = stacks.slice();
    const newDeck = deck.slice();

    const selectedStack = newStack[index]
    const newCard = newDeck.pop(0);
    const cardValue = newCard.value === 1 ? 14 : newCard.value;
    const comparisonValue = selectedStack[selectedStack.length - 1].value === 1 ? 14 : selectedStack[selectedStack.length - 1].value;
    const live = over ? (cardValue > comparisonValue) : (cardValue < comparisonValue)

    newStack[index].push({...newCard, live});

    setStacks(newStack);
    setDeck(newDeck);
  }

  return (
    <div className='app'>
      <div className='deck'>
        Left in deck: {deck.length}
        <br/>
        <div className='cardBack'>
          <img
            alt='card back'
            width={50}
            src="/cardback.svg"
          />
        </div>
      </div>
    <div className="game">
      {stacks.map((stack, stackIndex) => {
        return <div className='stack'>
          {stack.map((card, cardIndex) => <Card top={cardIndex === stack.length - 1} placeCard={(over) => placeCard(stackIndex, over)} offset={cardIndex} key={`${card.value}${card.suit}`} {...card}/>)}
        </div>
      })}
    </div>
    </div>
  );
}

export default App;
