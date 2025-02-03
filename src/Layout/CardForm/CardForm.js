import React, { use, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readCard, createCard, updateCard, readDeck } from '../../utils/api';
import '../Form.css'
function CardForm() {

    const [isCardNew, setIsCardNew] = useState(true);
    const [deckName, setDeckName] = useState('');
    const [formData, setFormData] = useState({
        front: '',
        back: ''
    });
    const { cardId, deckId } = useParams();
    useEffect(() => {
        const abort = new AbortController();
        if (cardId) {
            readCard(cardId, abort.signal).then((response) => {
                setFormData(response);
                setIsCardNew(false);
            })
        }

        readDeck(deckId, abort.signal).then((response) => {
            setDeckName(response.name);
        });

        return () => abort.abort();
    }, []);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abort = new AbortController();
        if (isCardNew) {
            createCard(deckId, formData, abort.signal).then((response) => {
                window.location.href = `/decks/${response.deckId}`;
            }).catch((error) => {
                window.alert("There was an error creating the card, please try again in a few moments");
            });
        } else {
            updateCard(formData, abort.signal).then((response) => {
                window.location.href = `/decks/${response.deckId}`;
            }).catch((error) => {
                window.alert("There was an error updating the card, please try again in a few moments");
            });
        }
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{isCardNew ? "Add Card" : "Edit Card"}</li>
                </ol>
            </nav>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.front}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.back}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default CardForm;