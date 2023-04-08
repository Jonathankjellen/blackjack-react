import React, { useState } from "react";
import "./App.css";
import Card from "./src/components/Card";

const App = (): JSX.Element => {
  const [clickedButton, setClickedButton] = useState('');
  const [betAmount, setBetAmount] = useState(0)

  return (
    <div>
      <Card value="one" suit="heart"/>
      <Card value="two" suit="clubs"/>
    </div>
  );
};

export default App;