import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import './FindMatchingColorApp.css'
import Navbar from './Navbar';
import ColorBox from './ColorBox';

// A card can be in 1 of 3 CardStates
// HIDING - the card is not being displayed
// SHOWING - the card is being displayed but does not have a match yet
// MATCHING - the card is being displayed and has a match.
//            the card should never more from MATCHING to another state during game play
const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

class FindMatchingColorApp extends Component {
  constructor(props) {
    super(props);
    let cards = [ { id: 0, cardState: CardState.HIDING, backgroundColor: 'lightblue' }, 
                  { id: 1, cardState: CardState.HIDING, backgroundColor: 'lightcoral' }, 
                  { id: 2, cardState: CardState.HIDING, backgroundColor: 'lightcoral' },
                  { id: 3, cardState: CardState.HIDING, backgroundColor: 'lightseagreen' },
                  { id: 4, cardState: CardState.HIDING, backgroundColor: 'lightcyan' },
                  { id: 5, cardState: CardState.HIDING, backgroundColor: 'lightblue' }, 
                  { id: 6, cardState: CardState.HIDING, backgroundColor: 'lightgreen' },
                  { id: 7, cardState: CardState.HIDING, backgroundColor: 'lightsalmon' },
                  { id: 8, cardState: CardState.HIDING, backgroundColor: 'lightgray' },
                  { id: 9, cardState: CardState.HIDING, backgroundColor: 'lightpink' }, 
                  { id: 10, cardState: CardState.HIDING, backgroundColor: 'lightseagreen' },
                  { id: 11, cardState: CardState.HIDING, backgroundColor: 'lightsalmon' },
                  { id: 12, cardState: CardState.HIDING, backgroundColor: 'lightcyan' },
                  { id: 13, cardState: CardState.HIDING, backgroundColor: 'lightgreen' },
                  { id: 14, cardState: CardState.HIDING, backgroundColor: 'lightgray' },
                  { id: 15, cardState: CardState.HIDING, backgroundColor: 'lightpink' } ];
    cards = shuffle(cards);
    this.state = { cards, noClick: false }
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map( card => {
        if(idsToChange.includes(card.id)) {
          return {
            ...card,
            cardState: newCardState
          };
        }
        return card;
      });
    }

    const foundCard = this.state.cards.find( card => card.id === id);

    if(this.state.noClick || foundCard.cardState !== CardState.HIDING) return;

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    const showingCards = cards.filter( card => card.cardState === CardState.SHOWING);

    const ids = showingCards.map( card => card.id );

    if(showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if(showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      noClick = true;
      this.setState({ cards, noClick }, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.5 seconds
          this.setState({ cards: hidingCards, noClick: false });
        }, 1500);
      });
      return;
    }

    this.setState({ cards, noClick })
  }

  handleNewGame(){
    let cards = this.state.cards.map( card => ({
      ...card,
      cardState: CardState.HIDING
    }));
    cards = shuffle(cards);
    this.setState({ cards });
  }

  render() {
    const cards = this.state.cards.map( card => ( 
      <ColorBox 
               key={ card.id }
               showing={ card.cardState !== CardState.HIDING }
               backgroundColor={ card.backgroundColor }
               onClick={ () => this.handleClick(card.id) }
      />
    ));
    return (
      <div className="FindMatchingColorApp">
        <Navbar onNewGame={ this.handleNewGame }/>
        <div className="container">
          { cards }
        </div>
      </div>
    );    
  }
}

export default FindMatchingColorApp;
