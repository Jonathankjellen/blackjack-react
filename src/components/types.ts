export interface CardProps {
    value: string;
    suit: string;
    hidden: boolean;
}

export interface HandProps {
    title: string;
    cards: any[];
}

export enum GameState {
    bet,
    init,
    userTurn,
    dealerTurn,
    lost,
    win,
    tie
  }
  