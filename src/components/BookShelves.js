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
            <BookList bookShelf={this.state.wantToRead} />
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
            <BookList bookShelf={this.state.currentlyReading} />
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
            <BookList bookShelf={this.state.read} />
          </Segment>
          <AddBook />
        </Segment.Group>
      </Container>
    );
  }
}

export default BookShelves;
