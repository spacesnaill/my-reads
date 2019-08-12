import React, { Component } from "react";
import { Button, Input, Container, Segment, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import * as BooksApi from "../BooksApi";
import PropTypes from "prop-types";
import Debounce from "lodash.debounce";

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  searchBooks = searchValue => {
    BooksApi.search(searchValue).then(results => {
      this.setState({
        searchResults: results.items || results || []
      });
    });
  };

  searchShelfForBookId = (bookShelfName, bookId) => {
    if (
      this.props[bookShelfName].find(book => {
        return book.id === bookId;
      })
    ) {
      return true;
    } else {
      return false;
    }
  };

  whichShelfContainsBookId = bookId => {
    if (this.searchShelfForBookId("wantToRead", bookId)) {
      return "wantToRead";
    } else if (this.searchShelfForBookId("currentlyReading", bookId)) {
      return "currentlyReading";
    } else if (this.searchShelfForBookId("read", bookId)) {
      return "read";
    } else {
      return "none";
    }
  };

  onSearchInputChange = event => {
    event.persist();
    this.debounceSearchInput(event.target.value);
  };

  debounceSearchInput = Debounce(newSearchValue => {
    this.setState({ searchValue: newSearchValue }, () => {
      if (newSearchValue.length > 1) {
        this.searchBooks(newSearchValue);
      } else {
        this.setState({ searchResults: [] });
      }
    });
  }, 250);

  render() {
    return (
      <Container width="66%" textAlign="center">
        <Segment textAlign="center">
          <Header textAlign="left" as="h1">
            Search
          </Header>
          <Input
            className="book-search-input"
            placeholder="Search for books"
            onChange={this.onSearchInputChange}
            size="large"
            icon="search"
          />
          <BookList
            bookShelf={this.state.searchResults}
            runAfterBookIsUpdated={this.props.moveBookToShelf}
            whichShelfContainsBookId={this.whichShelfContainsBookId}
          />
        </Segment>
        <Link to="/">
          <Button className="back-button">&#8592; Back to Bookshelves</Button>
        </Link>
      </Container>
    );
  }
}

BookSearch.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func
};

export default BookSearch;
