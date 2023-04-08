import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from "./components/Card";
import Hand from './components/Hand';
import jsonData from './deck.json';

function App() {
  const [clickedButton, setClickedButton] = useState('');
  const [betAmount, setBetAmount] = useState(0)

  const [userCards, setUserCards]: any[] = useState([]);
  const [dealerCards, setDealerCards]: any[] = useState([]);

  const data = JSON.parse(JSON.stringify(jsonData.cards));
  const [deck, setDeck]: any[] = useState(data);
  console.log(userCards)
  const getCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    switch (card.suit) {
      case 'spades':
        userCards.push({ 'value': card.value, 'suit': '♠', 'hidden': false });
        setUserCards([...userCards]);
        break;
      case 'diamonds':
        userCards.push({ 'value': card.value, 'suit': '♦', 'hidden': false });
        setUserCards([...userCards]);
        break;
      case 'clubs':
        userCards.push({ 'value': card.value, 'suit': '♣', 'hidden': false });
        setUserCards([...userCards]);
        break;
      case 'hearts':
        userCards.push({ 'value': card.value, 'suit': '♥', 'hidden': false });
        setUserCards([...userCards]);
        break;
      default:
        break;
    }
  }
  return (
    <div className="App">
      <div>
        <button onClick={getCard}>
          Activate Lasers
        </button>

      </div>
      <div>
        <Hand title={`Your Hand (${10})`} cards={userCards} />
      </div>
    </div>
  );
}

export default App;
