import React, { Component } from "react";
import * as BooksApi from "../BooksApi";
import BookList from "./BookList";
import AddBook from "./AddBook";
import { Segment, Container, Header, Menu } from "semantic-ui-react";

class BookShelves extends Component {
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
    this.addBookToShelf(parameters.destination, parameters.book.id);
    this.deleteBookFromShelf(parameters.origin, parameters.book.id);
  };

  render() {
    return (
      <Container width="66%" textAlign="center">
        <Segment.Group>
          <Segment
            textAlign="center"
            className="bookListContainer"
            loading={this.state.loading}
          >
            <Header textAlign="left" as="h2">
              Want To Read
            </Header>
            <BookList
              bookShelf={this.state.wantToRead}
              runAfterBookIsUpdated={this.moveBookToShelf}
              shelfName="wantToRead"
            />
          </Segment>

          <Segment
            textAlign="center"
            className="bookListContainer"
            loading={this.state.loading}
          >
            <Header textAlign="left" as="h2">
              Currently Reading
            </Header>
            <BookList
              bookShelf={this.state.currentlyReading}
              runAfterBookIsUpdated={this.moveBookToShelf}
              shelfName="currentlyReading"
            />
          </Segment>

          <Segment
            textAlign="center"
            className="bookListContainer"
            loading={this.state.loading}
          >
            <Header textAlign="left" as="h2">
              Read
            </Header>
            <BookList
              bookShelf={this.state.read}
              runAfterBookIsUpdated={this.moveBookToShelf}
              shelfName="read"
            />
          </Segment>
          <AddBook />
        </Segment.Group>
      </Container>
    );
  }
}

export default BookShelves;
