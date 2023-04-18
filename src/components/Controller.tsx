import React from 'react'
import { HandProps } from './types';
import styles from './styles/hand.module.css'
import Card from './Card';
type ControlsProps = {
    balance: number,

  };
const Controller = ({balance}:ControlsProps) => {
    
  return (
    <div>
        <h1>{balance}</h1>
    </div>
    
  )
}

export default Controller