import React from 'react';
import { CardProps } from '../types';
import styles from './styles/card.module.css'
//import "./styles/card.css"

const Card = ({value, suit}: CardProps) => {
    const getColor =() => {
        if(suit=="spades" || suit=="clubs"){
            return styles.black
        } else {
            return styles.red
        }
    }
    return (
        <div className={styles.card} >
            <div className={getColor()}>
                <h1 className={`${styles.value}`}>{value}</h1>
                <h1 className={styles.suit}>{suit}</h1>
            </div>
        </div>
        
        
    )
}

export default Card