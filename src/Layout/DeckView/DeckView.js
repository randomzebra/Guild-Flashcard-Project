import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import { deleteCard } from '../../utils/api';
import './DeckView.css';

function DeckView({ handleDeckDelete }) {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ cards: [] });

    useEffect(() => {
        const loadDeck = async () => {
            const loadedDeck = await readDeck(deckId);
            setDeck(loadedDeck);
        };
        loadDeck();
    }, [deckId]);

    if (!deck.id) {
        return <p>Loading...</p>;
    }

    const handleCardDelete = (event) => {
        event.preventDefault();
        const handleCardDelete = async (cardId) => {
            if (window.confirm("Are you sure you want to delete this card?")) {
                await deleteCard(cardId);
                const updatedDeck = await readDeck(deckId);
                setDeck(updatedDeck);
            }
        };
        handleCardDelete(event.target.value);
    }
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <div className="btn-group">
                <Link to={`/decks/${deck.id}/edit`} state={{
                    initialData: {
                        name: deck.name,
                        description: deck.description
                    }
                }} className="btn btn-secondary">Edit</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
                <button className="btn btn-danger" onClick={(event) => handleDeckDelete(event, deckId)}>Delete</button>
            </div>
            <h3>Cards</h3>
            <div>
                {deck.cards.map(card => (
                    <div className="card" key={card.id}>
                        <p className='card-text'>{card.front}</p>
                        <p className='card-text'>{card.back}</p>
                        <div className='btn-group'>
                            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary btn-int">Edit</Link>
                            <button className="btn btn-danger btn-int" value={card.id} onClick={handleCardDelete}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeckView;