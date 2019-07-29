import React, { Component } from "react";
import * as BooksApi from "../BooksApi";
import BookList from "./BookList";
import AddBook from "./AddBook";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
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
        <CssBaseline />
        <Container maxWidth="md">
          <h1>Currently Reading</h1>
          <BookList bookShelf={this.state.currentlyReading} />
          <hr />
          <h1>Want To Read</h1>
          <BookList bookShelf={this.state.wantToRead} />
          <hr />
          <h1>Read</h1>
          <BookList bookShelf={this.state.read} />
          <AddBook />
        </Container>
      </div>
    );
  }
}

export default BookShelves;
