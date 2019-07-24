import React, { Component } from "react";
import * as BooksApi from "../BooksApi";
import BookList from "./BookList";
import AddBook from "./AddBook";

class BookShelves extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
  }

  filterBooksByShelf(books, shelfName) {
    return books.filter(book => {
      console.log(book.shelf);
      if (book.shelf === shelfName) {
        return true;
      } else {
        return false;
      }
    });
  }

  componentDidMount() {
    BooksApi.getAll().then(books => {
      console.log(books);
      this.setState({
        currentlyReading: this.filterBooksByShelf(books, "currentlyReading"),
        wantToRead: this.filterBooksByShelf(books, "wantToRead"),
        read: this.filterBooksByShelf(books, "read")
      });
    });
  }

  render() {
    return (
      <div>
        <BookList bookShelf={this.state.currentlyReading} />
        <AddBook />
      </div>
    );
  }
}

export default BookShelves;
