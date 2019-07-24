import React from "react";
import Book from "./Book";
import MoveBook from "./MoveBook";

function BookList(props) {
  return (
    <ol>
      {props.bookShelf.map(book => {
        return (
          <li>
            <Book />
            <MoveBook />
          </li>
        );
      })}
    </ol>
  );
}

export default BookList;
