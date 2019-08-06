import React, { Component } from "react";
import { Button, Input, Container, Segment, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import * as BooksApi from "../BooksApi";

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      loading: false,
      searchValue: ""
    };
  }

  componentDidMount() {
    if (this.state.searchParameter) {
      this.setState({ loading: true });
      this.searchBooks(this.state.searchParameter);
    } else {
    }
  }

  searchBooks = searchParameter => {
    BooksApi.search(searchParameter).then(results => {
      this.setState({
        searchResults: results.items || results || [],
        loading: false
      });
    });
  };

  onSearchInputChange = event => {
    const newValue = event.target.value;
    this.setState({ searchValue: newValue }, () => {
      if (newValue.length > 1) {
        this.searchBooks(this.state.searchValue);
      }
    });
  };

  render() {
    return (
      <Container width="66%" textAlign="center">
        <Segment textAlign="center" className="" loading={this.state.loading}>
          <Header textAlign="left" as="h1">
            Book Search
          </Header>
          <form>
            <Input
              value={this.state.searchValue}
              placeholder="Search for books"
              onChange={this.onSearchInputChange}
              action={{ content: "Search" }}
            />
          </form>
          <BookList bookShelf={this.state.searchResults} shelfName="" />
        </Segment>
        <Link to="/">
          <Button className="back-button">&#8592; Back to Bookshelves</Button>
        </Link>
      </Container>
    );
  }
}

export default BookSearch;
