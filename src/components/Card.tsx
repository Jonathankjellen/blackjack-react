import React from 'react';
import { CardProps } from './types';
import styles from './styles/card.module.css'
//import "./styles/card.css"

const Card = ({value, suit, hidden}: CardProps) => {
    const getColor =() => {
        if(suit==="♠" || suit==="♣"){
            return styles.black
        } else {
            return styles.red
        }
    }
    const checkHidden = () => {
        if (hidden == true) {
            return (<div className={styles.hidden} > </div>);
        } 
        else {
            return (
                <div className={styles.card} >
                    <div className={getColor()}>
                        <h1 className={styles.value}>{value}</h1>
                        <h1 className={styles.suit}>{suit}</h1>
                    </div>
                </div>
            );
        }
    }
    return (

            checkHidden() 
        )
        
}

export default Card