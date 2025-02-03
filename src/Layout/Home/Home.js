import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks } from '../../utils/api';
import DeckList from '../DeckList/DeckList';

const Home = ({ handleDeckDelete }) => {
    
    const [decks, setDecks] = React.useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setDecks);
        return () => abortController.abort();
    }, []);

    return (
        <div>
            <Link to="/decks/new">
                <button className="btn btn-primary className deck-btn">Create Deck</button>
            </Link>
            <DeckList decks={decks} handleDeckDelete={handleDeckDelete}/>
        </div>
    );
};

export default Home;