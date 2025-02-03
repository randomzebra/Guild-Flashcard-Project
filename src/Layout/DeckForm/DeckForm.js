import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { readDeck, createDeck, updateDeck } from '../../utils/api'
import '../Form.css'
function DeckForm() {
    // const { initialData } = props.location.state.initialData;
    const { deckId } = useParams();    
    const [isInitialDataEmpty, setIsInitialDataEmpty] = useState(true);
    useEffect(() => {
        if (deckId) {
            const abortController = new AbortController();
            readDeck(deckId, abortController.signal).then(
                setFormData);
            setIsInitialDataEmpty(false);
            return () => abortController.abort();
        }
    }, [deckId]);


    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abort = new AbortController();
        if (isInitialDataEmpty) {
            createDeck(formData, abort.signal).then((response) => {
                window.location.href = `/decks/${response.id}`;
            }).catch((error) => {
                window.alert("There was an error creating the deck, please try again in a few moments");
            });
        } else {
            updateDeck(formData, abort.signal).then((response) => {
                window.location.href = `/decks/${response.id}`;
            }).catch((error) => {             
                window.alert("There was an error updating the deck, please try again in a few moments");
            });
        }
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{isInitialDataEmpty ? "Create Deck" : "Edit Deck"}</li>
                </ol>
            </nav>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        className="form-control"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default DeckForm;