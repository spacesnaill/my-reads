import React, { Component } from "react";
import { Button, Search, Container, Segment, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import * as BooksApi from "../BooksApi";

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      loading: true
    };
  }

  componentDidMount() {
    BooksApi.search("Linux").then(results => {
      console.log(results);
      this.setState({
        searchResults: results,
        loading: false
      });
    });
  }

  render() {
    return (
      <Container width="66%" textAlign="center">
        <Segment textAlign="center" className="" loading={this.state.loading}>
          <Header textAlign="left" as="h1">
            Book Search
          </Header>
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
