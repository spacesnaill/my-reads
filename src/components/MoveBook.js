import React from "react";
import { Dropdown } from "semantic-ui-react";
import { update } from "../BooksApi";
function MoveBook(props) {
  function moveBookToShelf(book, shelfName, runAfterUpdate) {
    update(book, shelfName);
  }

  return (
    <Dropdown text="Move Book to. . .">
      <Dropdown.Menu>
        {props.bookShelves.map(bookShelf => {
          return (
            <Dropdown.Item
              key={bookShelf.name}
              disabled={props.shelfName === bookShelf.name}
              onClick={event => {
                moveBookToShelf(props.book, bookShelf.name);
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

export default MoveBook;
