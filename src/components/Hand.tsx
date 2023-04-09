import React from 'react'
import { HandProps } from './types';
import styles from './styles/hand.module.css'
import Card from './Card';

const Hand = ({title, cards}: HandProps) => {
    const getTitle = () => {
        if (cards.length > 0) {
          return (
            <h1 className={styles.title}>{title}</h1>
          );
        }
      }
  return (
    <div>
        {getTitle()}
        <div className={styles.cardContainer}>
            {cards.map((card: any, index: number) => {
                return (
                    <Card key={index} value={card.value} suit={card.suit} hidden={card.hidden}/>
            );
            })}
        </div>
    </div>
    
  )
}

export default Hand