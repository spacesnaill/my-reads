import React from "react";
import Book from "./Book";
import MoveBook from "./MoveBook";
import PropTypes from "prop-types";
import { Card, Dropdown } from "semantic-ui-react";

function BookList(props) {
  return (
    <Card.Group className="bookList">
      {props.bookShelf.map(book => {
        return (
          <Card key={book.id} className="book-card">
            <Book title={book.title} image={book.imageLinks.smallThumbnail} />
            <Card.Content extra>
              <Dropdown text="Move Book to...">
                <Dropdown.Menu>
                  <Dropdown.Item
                    disabled={props.shelfName === "wantToRead"}
                    onClick={event => {
                      props.moveBookToShelf(
                        book,
                        props.shelfName,
                        "wantToRead"
                      );
                    }}
                  >
                    Want To Read
                  </Dropdown.Item>
                  <Dropdown.Item
                    disabled={props.shelfName === "currentlyReading"}
                    onClick={event => {
                      props.moveBookToShelf(
                        book,
                        props.shelfName,
                        "currentlyReading"
                      );
                    }}
                  >
                    Currently Reading
                  </Dropdown.Item>
                  <Dropdown.Item
                    disabled={props.shelfName === "read"}
                    onClick={event => {
                      props.moveBookToShelf(book, props.shelfName, "read");
                    }}
                  >
                    Read
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  );
}

BookList.propTypes = {
  bookShelf: PropTypes.array.isRequired,
  shelfName: PropTypes.string.isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default BookList;
// onClick={event => {
//   event.preventDefault();
//   props.moveBookToShelf(book.id, props.shelfName, "read");
// }}
