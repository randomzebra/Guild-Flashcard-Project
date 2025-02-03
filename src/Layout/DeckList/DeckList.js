import React from 'react';
import { Link } from 'react-router-dom';
import './DeckList.css';

function DeckList({ decks, handleDeckDelete }) {

    return (
        <div>
            {decks.map((deck) => (
                <div key={deck.id} className="deck">
                    <div className="deck-header">
                        <h2 className="deck-title">{deck.name}</h2>
                        <p className="deck-count">{deck.cards.length} cards</p>
                    </div>
                    <p>{deck.description}</p>
                    <Link className="deck-link view" to={`/decks/${deck.id}`}>
                        <button className='deck-btn view'>View Deck</button>
                    </Link>
                    <Link className="deck-link study" to={`/decks/${deck.id}/study`}>
                        <button className='deck-btn study'>Study</button>
                    </Link>
                    <button className="deck-btn delete" onClick={(event) => handleDeckDelete(event, deck.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default DeckList;