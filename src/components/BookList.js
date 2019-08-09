import React from "react";
import Book from "./Book";
import MoveBook from "./MoveBook";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";

function BookList(props) {
  const bookShelfOptions = [
    { name: "wantToRead", title: "Want To Read" },
    { name: "currentlyReading", title: "Currently Reading" },
    { name: "read", title: "Read" },
    { name: "none", title: "None" }
  ];

  function httpToHttps(link) {
    return link.replace("http", "https");
  }

  return (
    <Card.Group className="bookList">
      {props.bookShelf.map(book => {
        return (
          <Card key={book.id} className="book-card">
            <Book
              title={book.title}
              image={
                book.imageLinks
                  ? httpToHttps(book.imageLinks.smallThumbnail)
                  : "https://via.placeholder.com/100/160"
              }
              averageRating={book.averageRating || 0}
              ratingsCount={book.ratingsCount || 0}
              authors={book.authors || []}
            />
            <Card.Content extra>
              <MoveBook
                bookShelves={bookShelfOptions}
                book={book}
                runAfterBookIsUpdated={props.runAfterBookIsUpdated}
              />
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  );
}

BookList.propTypes = {
  bookShelf: PropTypes.array.isRequired,
  runAfterBookIsUpdated: PropTypes.func
};

export default BookList;
