import React from 'react'
import { HandProps } from './types';
import styles from './styles/hand.module.css'
import Card from './Card';
import { GameState } from './types';

const Status = ({Message}:any) => {
    
  return (
    <div>
        <h1>{Message}</h1>
    </div>
    
  )
}

export default Status