import React from "react";
import Book from "./Book";
import MoveBook from "./MoveBook";
import PropTypes from "prop-types";

function BookList(props) {
  return (
    <ol>
      {props.bookShelf.map(book => {
        return (
          <li>
            <Book title={book.title} image={book.imageLinks.smallThumbnail} />
            <MoveBook />
          </li>
        );
      })}
    </ol>
  );
}

BookList.propTypes = {
  bookShelf: PropTypes.array.isRequired
};

export default BookList;
