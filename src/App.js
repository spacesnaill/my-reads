import React from "react";
import "./App.css";
import BookShelves from "./components/BookShelves";
import BookSearch from "./components/BookSearch";
import { BrowserRouter as Router, Route } from "react-router-dom";

// TODO Pick up the state for the bookshelves and put it in this component so it can be shared between both the bookshelves page and the search page
function App() {
  return (
    <Router>
      <Route exact path="/" component={BookShelves} />
      <Route exact path="/Search" component={BookSearch} />
    </Router>
  );
}

export default App;
