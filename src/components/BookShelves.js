import React, { Component } from "react";
import * as BooksApi from "../BooksApi";
import BookList from "./BookList";
import AddBook from "./AddBook";
import { Segment, Container, Divider, Header } from "semantic-ui-react";

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
        //const newBookShelf = currentState;
        return {
          [bookShelfName]: currentState[bookShelfName]
        };
      });
    });
  };

  moveBookToShelf = (bookId, origin, destination) => {
    this.deleteBookFromShelf(origin, bookId);
    this.addBookToShelf(destination, bookId);
  };

  render() {
    return (
      <Container width="66%" textAlign="center">
        <Segment.Group textAlign="center">
          <Segment
            textAlign="center"
            fluid={true}
            className="bookListContainer"
            loading={this.state.loading}
          >
            <Header textAlign="left" as="h2">
              Want To Read
            </Header>
            <BookList
              bookShelf={this.state.wantToRead}
              moveBookToShelf={this.moveBookToShelf}
              shelfName="wantToRead"
            />
          </Segment>

          <Segment
            textAlign="center"
            fluid={true}
            className="bookListContainer"
            loading={this.state.loading}
          >
            <Header textAlign="left" as="h2">
              Currently Reading
            </Header>
            <BookList
              bookShelf={this.state.currentlyReading}
              moveBookToShelf={this.moveBookToShelf}
              shelfName="currentlyReading"
            />
          </Segment>

          <Segment
            textAlign="center"
            fluid={true}
            className="bookListContainer"
            loading={this.state.loading}
          >
            <Header textAlign="left" as="h2">
              Read
            </Header>
            <BookList
              bookShelf={this.state.read}
              moveBookToShelf={this.moveBookToShelf}
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
