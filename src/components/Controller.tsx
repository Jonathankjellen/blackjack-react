import React,{ useState, useEffect  } from 'react'
import { HandProps } from './types';
import styles from './styles/controller.module.css'
import Card from './Card';
import { GameState } from './types';
type ControlsProps = {
    balance: number,
    resetEnv: any,
    hit: any,
    revealHidden: any,
    placeBet: any,
    buttonState: any,
    currentBet: any,
    gameState: any,
  };
const Controller = ({balance,resetEnv,hit,revealHidden,placeBet,buttonState,currentBet,gameState}:ControlsProps) => {
  const [amount, setAmount] = useState(10);

  const amountChange = (e: any) => {
    setAmount(e.target.value);
  }
  const checkBet = (amount: number) => {
    if (balance > amount) {
      placeBet(amount)
    }
  }


  if (gameState == GameState.bet){
    return (
      <div className={styles.controlsContainer}>
          <div className={styles.betContainer}>
            <h4>Amount:</h4>
            <input autoFocus type='number' value={amount} onChange={amountChange}/>
          </div>
          <button onClick={()=>checkBet(amount)} className={styles.button}>
            Bet
          </button>
          <h1>Balance: {balance} Total Bet: {currentBet}</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.controlsContainer}>
          <button onClick={()=>resetEnv()} className={styles.button} disabled={buttonState.resetDisabled}>
            Reset
          </button>
          <button onClick={()=>hit()} className={styles.button} disabled={buttonState.hitDisabled}>
            Hit
          </button>
          <button onClick={()=>revealHidden()} className={styles.button} disabled={buttonState.standDisabled}>
            Stay
          </button>
          <h1>Balance: {balance} Total Bet: {currentBet}</h1>
      </div>
    );
    }
  
    
}


export default Controller