import React from "react";
import Book from "./Book";
import MoveBook from "./MoveBook";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";

function BookList(props) {
  return (
    <Card.Group className="bookList">
      {props.bookShelf.map(book => {
        return (
          <Card key={book.id} color="green" className="book-card">
            <Book title={book.title} image={book.imageLinks.smallThumbnail} />
            <Card.Content extra>
              <MoveBook />
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  );
}

BookList.propTypes = {
  bookShelf: PropTypes.array.isRequired
};

export default BookList;
