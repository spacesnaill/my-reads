import React, { Component } from "react";
import { Button, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import * as BooksApi from "../BooksApi";

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  componentDidMount() {
    BooksApi.search("Linux").then(results => {
      console.log(results);
      this.setState({
        searchResults: results
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Book Search</h1>
        <BookList bookShelf={this.state.searchResults} shelfName="" />
        <Link to="/">
          <Button className="back-button">&#8592; Back to Bookshelves</Button>
        </Link>
      </div>
    );
  }
}

export default BookSearch;
