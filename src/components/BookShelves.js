import React, { Component } from "react";
import * as BooksApi from "../BooksApi";
import BookList from "./BookList";
import AddBook from "./AddBook";

class BookShelves extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <BookList />
        <BookList />
        <BookList />
        <AddBook />
      </div>
    );
  }
}

export default BookShelves;
