import React, { Component } from "react";
import "./App.css";
import BookShelves from "./components/BookShelves";
import BookSearch from "./components/BookSearch";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as BooksApi from "./BooksApi";

// TODO Pick up the state for the bookshelves and put it in this component so it can be shared between both the bookshelves page and the search page

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      loading: true
    };
  }

  filterBooksByShelf(books, shelfName) {
    return books.filter(book => {
      if (book.shelf === shelfName) {
        return true;
      } else {
        return false;
      }
    });
  }

  componentDidMount() {
    BooksApi.getAll().then(books => {
      this.setState({
        currentlyReading: this.filterBooksByShelf(books, "currentlyReading"),
        wantToRead: this.filterBooksByShelf(books, "wantToRead"),
        read: this.filterBooksByShelf(books, "read"),
        loading: false
      });
    });
  }

  deleteBookFromShelf = (bookShelfName, bookId) => {
    this.setState(currentState => {
      const newBookShelf = currentState[bookShelfName].filter(book => {
        if (book.id !== bookId) {
          return true;
        } else {
          return false;
        }
      });
      return {
        [bookShelfName]: newBookShelf
      };
    });
  };

  addBookToShelf = (bookShelfName, bookId) => {
    BooksApi.get(bookId).then(book => {
      this.setState(currentState => {
        currentState[bookShelfName].push(book);
        return {
          [bookShelfName]: currentState[bookShelfName]
        };
      });
    });
  };

  moveBookToShelf = parameters => {
    if (parameters.origin !== "none") {
      this.deleteBookFromShelf(parameters.origin, parameters.book.id);
    }
    if (parameters.destination !== "none") {
      this.addBookToShelf(parameters.destination, parameters.book.id);
    }
  };

  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={() => (
            <BookShelves
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              moveBookToShelf={this.moveBookToShelf}
            />
          )}
        />
        <Route
          exact
          path="/Search"
          render={() => (
            <BookSearch
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              moveBookToShelf={this.moveBookToShelf}
            />
          )}
        />
      </Router>
    );
  }
}

export default App;
