import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api';

function DeckStudy() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const loadDeck = async () => {
            const abort = new AbortController();
            const loadedDeck = await readDeck(deckId, abort.signal);
            setDeck(loadedDeck);
        };
        loadDeck();
    }, [deckId]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentCardIndex < deck.cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
        } else {
            if (window.confirm("Restart cards?")) {
                setCurrentCardIndex(0);
                setIsFlipped(false);
            }
        }
    };
    if (deck.cards && deck.cards.length < 3) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><Link to={`/decks/${deckId}`}> {deck.name} </Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
                <h2>Study: {deck.name}</h2>
                <p>Not enough cards to study. You need at least 3 cards.</p>
                <Link to={`/decks/${deckId}/cards/new`}>
                    <button className="btn btn-primary">Add Cards</button>
                </Link>
            </div>
        );
    }
    if (!deck.id) {
        return <p>Loading...</p>;
    }

    const currentCard = deck.cards[currentCardIndex];

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to={`/decks/${deckId}`}> {deck.name} </Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>Study: {deck.name}</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Card {currentCardIndex + 1} of {deck.cards.length}</h5>
                    <p className="card-text">{isFlipped ? currentCard.back : currentCard.front}</p>
                    <button onClick={handleFlip} className="btn btn-secondary">Flip</button>
                    {isFlipped && <button onClick={handleNext} className="btn btn-primary">Next</button>}
                </div>
            </div>
        </div>
    );
}

export default DeckStudy;