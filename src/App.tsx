import React, { useState, useEffect  } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from "./components/Card";
import Hand from './components/Hand';
import Controller from './components/Controller';
import jsonData from './deck.json';
import {GameState} from "./components/types"
import Status from './components/Status';

function App() {
  enum Message {
    bet = 'Place your Bet!',
    hitStand = 'Hit or Stand?',
    bust = 'Bust!',
    userWin = 'You Win!',
    dealerWin = 'Dealer Wins!',
    tie = 'Tie!'
  }

  const [clickedButton, setClickedButton] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const [balance, setBalance] = useState(100);

  const [userCards, setUserCards]: any[] = useState([]);
  const [userCardScore, setUserCardScore] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [dealerCards, setDealerCards]: any[] = useState([]);
  const [dealerCardScore, setDealerCardScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const data = JSON.parse(JSON.stringify(jsonData.cards));
  const [deck, setDeck]: any[] = useState(data);

  const [gameState, setGameState] = useState(GameState.bet);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  });
  const [message, setMessage] = useState(Message.bet);


  useEffect(() => {
    calculateScore(userCards, setUserCardScore);
    setUserCount(userCount+1)
  }, [userCards]);

  useEffect(() => {
    calculateScore(dealerCards, setDealerCardScore);
    setDealerCount(dealerCount+1)
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
        bust(gameState)
        console.log("you lost")
      } else if (userCardScore == 21){
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      }
    }
  }, [userCount])

  useEffect(() => {
    if(gameState == GameState.dealerTurn){
      console.log("")
      console.log(userCardScore)
      console.log(dealerCardScore)
      
      if (dealerCardScore < 17) {
        getCard("dealer");
      } 
      else if (userCardScore > dealerCardScore || dealerCardScore > 21){
        win()
      }
      else if(dealerCardScore > userCardScore){
        bust(gameState)
      }
      else {
        tie()
      }
      buttonState.resetDisabled = false; 
    }
  },[dealerCount])

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
  const tie = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setBalance(balance + betAmount)
    setButtonState({ ...buttonState });
    setGameState(GameState.tie)
    setMessage(Message.tie)
  }
  const win = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setBalance(balance + betAmount*2)
    setButtonState({ ...buttonState });
    setGameState(GameState.win)
    setMessage(Message.userWin)
  }

  const bust = (state: GameState) => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setGameState(GameState.lost)

    if(state == GameState.userTurn){
      setMessage(Message.bust)
    } else if (state == GameState.dealerTurn) {
      setMessage(Message.dealerWin)
    }
    
  }

  const revealHidden = () => {
    buttonState.resetDisabled = false;
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    
    setButtonState({ ...buttonState });
    setGameState(GameState.dealerTurn)
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
  const placeBet = (amount: number) => {
    setBetAmount(amount);
    setGameState(GameState.init)
    setMessage(Message.hitStand)
    setBalance(balance - amount)
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
    setMessage(Message.bet)

    buttonState.hitDisabled = false;
    buttonState.resetDisabled = true;
    buttonState.standDisabled = false;
    setButtonState({ ...buttonState });
    setGameState(GameState.bet)
    
    console.log(userCardScore)
  }

  
  return (
    <div className="App">
        <Status Message={message}/>
        <Hand title={`Dealers Hand (${dealerCardScore})`} cards={dealerCards}/>
        <Hand title={`Your Hand (${userCardScore})`} cards={userCards} />
        <Controller balance={balance} resetEnv={resetEnv} hit={hit} revealHidden={revealHidden} placeBet={placeBet} buttonState={buttonState} currentBet={betAmount} gameState={gameState}/>
    </div>
  );
}

export default App;
