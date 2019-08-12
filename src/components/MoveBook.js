import React from "react";
import { Dropdown } from "semantic-ui-react";
import { update } from "../BooksApi";
import PropTypes from "prop-types";

function MoveBook(props) {
  function moveBookToShelf(book, destinationShelfName, runAfterUpdate) {
    update(book, destinationShelfName).then(result => {
      if (runAfterUpdate) {
        runAfterUpdate({
          book: props.book,
          origin: props.shelfBookBelongsTo,
          destination: destinationShelfName
        });
      }
    });
  }

  return (
    <Dropdown text="Move Book to. . .">
      <Dropdown.Menu>
        {props.bookShelves.map(bookShelf => {
          return (
            <Dropdown.Item
              key={bookShelf.name}
              disabled={bookShelf.name === props.shelfBookBelongsTo}
              onClick={event => {
                moveBookToShelf(
                  props.book,
                  bookShelf.name,
                  props.runAfterBookIsUpdated
                );
              }}
            >
              {bookShelf.title}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

MoveBook.propTypes = {
  bookShelves: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired,
  runAfterBookIsUpdated: PropTypes.func,
  shelfBookBelongsTo: PropTypes.string.isRequired
};

export default MoveBook;
