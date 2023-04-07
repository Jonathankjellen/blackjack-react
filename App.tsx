import React, { useState } from "react";
import "./App.css";

const App = (): JSX.Element => {
  const [clickedButton, setClickedButton] = useState('');
  const [betAmount, setBetAmount] = useState(0)

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setBetAmount(betAmount +10);
  };

  return (
    <div className="container">
      <h3>Kindacode.com</h3>
      <form>
        <button onClick={buttonHandler} className="button" name="button 1">
          Button 1
        </button>

        <button onClick={buttonHandler} className="button" name="button 2">
          Button 2
        </button>

        <button onClick={buttonHandler} className="button" name="button 3">
          Button 3
        </button>

        <button onClick={buttonHandler} className="button" name="button 4">
          Button 4
        </button>
      </form>
      <h1>
        `You have clicked "${betAmount}"`
      </h1>
    </div>
  );
};

export default App;