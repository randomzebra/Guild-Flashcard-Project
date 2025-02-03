import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import DeckForm from "./DeckForm/DeckForm";
import DeckView from "./DeckView/DeckView";
import DeckStudy from "./DeckStudy/DeckStudy";
import CardForm from "./CardForm/CardForm";
import { deleteDeck } from "../utils/api";

function Layout() { 
    const handleDeckDelete = (event, deckId) => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete this deck?")) {
            // Add code to delete the deck here
            // Assuming you have a deleteDeck function in your api utils
            const abort = new AbortController();
            deleteDeck(deckId, abort.signal).then(() => {
                // Redirect to home page after deletion
                window.location.href = "/";
            }).catch((error) => {
                console.error("Error deleting deck:", error);
            });
        }
    }

    const home = () => {
        return <Home handleDeckDelete={handleDeckDelete} />;
    }
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
          <Route path="/" element={home()} />
          <Route path="decks" element={home()} />
          <Route path="decks/new" element={<DeckForm />} />
          <Route path="decks/:deckId" element={<DeckView handleDeckDelete={handleDeckDelete}/>} />
          <Route path="decks/:deckId/study" element={<DeckStudy />} />
          <Route path="decks/:deckId/edit" element={<DeckForm />} />
          <Route path="decks/:deckId/cards/new" element={<CardForm />} />
          <Route path="decks/:deckId/cards/:cardId/edit" element={<CardForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </div>
  );
}

export default Layout;
