import React, { useState, useEffect  } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from "./components/Card";
import Hand from './components/Hand';
import jsonData from './deck.json';

function App() {

  enum GameState {
    bet,
    init,
    userTurn,
    dealerTurn,
    bust
  }

  const [clickedButton, setClickedButton] = useState('');
  const [betAmount, setBetAmount] = useState(0);

  const [userCards, setUserCards]: any[] = useState([]);
  const [userCardScore, setUserCardScore] = useState(0);

  const [dealerCards, setDealerCards]: any[] = useState([]);
  const [dealerCardScore, setDealerCardScore] = useState(0);

  const data = JSON.parse(JSON.stringify(jsonData.cards));
  const [deck, setDeck]: any[] = useState(data);

  const [gameState, setGameState] = useState(GameState.bet);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: false
  });

  useEffect(() => {
    calculateScore(userCards, setUserCardScore);
  }, [userCards]);

  useEffect(() => {
    calculateScore(dealerCards, setDealerCardScore);
  }, [dealerCards]);

  useEffect(() => {
    if (gameState == GameState.init){
      getCard("user")
      getCard("user")
      getCard("dealer")
      getCard("hidden")
      console.log("init")
      setGameState(GameState.userTurn)
    }
  })

  useEffect(() => {
    if(gameState == GameState.userTurn){
      if(userCardScore > 21){
        bust()
        console.log("you lost")
      }
    }
  })

  useEffect(() => {
    if(gameState == GameState.dealerTurn){
      if(dealerCardScore <= 21 && dealerCardScore > userCardScore){
        console.log("user lost")
        buttonState.hitDisabled = true;
        buttonState.resetDisabled = false;
        buttonState.standDisabled = true;
        setButtonState({ ...buttonState });
      }
      else if (dealerCardScore < 17){
        getCard("dealer");
      } 
      else if(dealerCardScore > 21){
        console.log("user won")
        setGameState(GameState.bust)
      }
      buttonState.resetDisabled = false; 
    }
  })

  const calculateScore = (cards: any[], setScore: any) => {
    let total = 0;
    cards.forEach((card: any) => {
      if(card.hidden == false){
        switch (card.value) {
          case 'K':
            total += 10;
            break;
          case 'Q':
            total += 10;
            break;
          case 'J':
            total += 10;
            break;
          case 'A': // Change this to be both 1 and another value
            total += 1
            break;
          default:
            total += Number(card.value);
            break;
      }
      
    }});
    setScore(total);
  }
  const setCards = (dealType: string, value: string, suit: string) => {
    if (dealType == "user"){
      userCards.push({ 'value': value, 'suit': suit, 'hidden': false });
      setUserCards([...userCards]);
    } 
    else if (dealType == "dealer"){
      dealerCards.push({'value':value, 'suit': suit, 'hidden':false})
      setDealerCards([...dealerCards]);
    }
    else if (dealType == "hidden"){
      dealerCards.push({'value':value, 'suit': suit, 'hidden':true})
      setDealerCards([...dealerCards]);
    }
      
  }

  const bust = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setGameState(GameState.bust)
  }

  const revealHidden = () => {
    setGameState(GameState.dealerTurn)
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    setButtonState({ ...buttonState });
    dealerCards.filter((card: any) => {
      if(card.hidden == true){
        card.hidden = false
      }
      return card
    });
    setDealerCards([...dealerCards])
  }

  const hit = () => {
    if(gameState == GameState.userTurn){
      getCard("user")

    }
  }

  const getCard = (dealtype: string) => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    deck.splice(randomIndex, 1);
    
    const newDeck = [...deck];

    setDeck(newDeck);
    switch (card.suit) {
      case 'spades':
        setCards(dealtype, card.value, '♠' );
        break;
      case 'diamonds':
        setCards(dealtype, card.value, '♦');
        break;
      case 'clubs':
        setCards(dealtype,card.value,'♣');
        break;
      case 'hearts':
        setCards(dealtype,card.value, '♥');
        break;
      default:
        break;
    }
  }
  const resetEnv = () => {
    setDeck(data);
    setUserCards([]);
    setUserCardScore(0);
    setDealerCards([]);
    setDealerCardScore(0);

    buttonState.hitDisabled = false;
    buttonState.resetDisabled = true;
    buttonState.standDisabled = false;
    setButtonState({ ...buttonState });
    setGameState(GameState.init)
    
    console.log(userCardScore)
  }

  
  return (
    <div className="App">
      <div>
      <button onClick={()=>resetEnv()} disabled={buttonState.resetDisabled}>
          Reset
        </button>
        <button onClick={()=>hit()} disabled={buttonState.hitDisabled}>
          Hit
        </button>
        <button onClick={()=>revealHidden()} disabled={buttonState.standDisabled}>
          Stay
        </button>

      </div>
      <div>
        <Hand title={`Your Hand (${userCardScore})`} cards={userCards} />
        <Hand title={`Dealers Hand (${dealerCardScore})`} cards={dealerCards}/>
      </div>
    </div>
  );
}

export default App;
