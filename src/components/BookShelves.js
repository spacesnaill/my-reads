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
        read: this.filterBooksByShelf(books, "read")
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Currently Reading</h1>
        <BookList bookShelf={this.state.currentlyReading} />
        <hr />
        <h1>Want To Read</h1>
        <BookList bookShelf={this.state.wantToRead} />
        <hr />
        <h1>Read</h1>
        <BookList bookShelf={this.state.read} />
        <AddBook />
      </div>
    );
  }
}

export default BookShelves;
