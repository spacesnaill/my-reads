import React, { Component } from "react";
import * as BooksApi from "../BooksApi";
import BookList from "./BookList";
import AddBook from "./AddBook";
import { Container, Divider, Header } from "semantic-ui-react";

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
      <Container textAlign="center" className="mainContainer">
        <Container
          textAlign="center"
          fluid={true}
          className="bookListContainer"
        >
          <Header textAlign="left" as="h2">
            Want To Read
          </Header>
          <BookList bookShelf={this.state.wantToRead} />
        </Container>

        <Divider />

        <Container
          textAlign="center"
          fluid={true}
          className="bookListContainer"
        >
          <Header textAlign="left" as="h2">
            Currently Reading
          </Header>
          <BookList bookShelf={this.state.currentlyReading} />
        </Container>

        <Divider className="divider" />
        <Container
          textAlign="center"
          fluid={true}
          className="bookListContainer"
        >
          <Header textAlign="left" as="h2">
            Read
          </Header>
          <BookList bookShelf={this.state.read} />
        </Container>
        <AddBook />
      </Container>
    );
  }
}

export default BookShelves;
