import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from "./components/Card";

function App() {
  const [clickedButton, setClickedButton] = useState('');
  const [betAmount, setBetAmount] = useState(0)
  return (
    <div className="App">
      <div>
        <Card value="one" suit="heart"/>
        <Card value="two" suit="clubs"/>
      </div>
    </div>
  );
}

export default App;
