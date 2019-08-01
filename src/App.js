import React from "react";
import "./App.css";
import BookShelves from "./components/BookShelves";
import BookSearch from "./components/BookSearch";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" component={BookShelves} />
      <Route path="/BookSearch" component={BookSearch} />
    </Router>
  );
}

export default App;
