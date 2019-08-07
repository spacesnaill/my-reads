import React from "react";
import BookList from "./BookList";
import AddBook from "./AddBook";
import { Segment, Container, Header } from "semantic-ui-react";
import PropTypes from "prop-types";

function BookShelves(props) {
  return (
    <Container width="66%" textAlign="center">
      <Segment.Group>
        <Segment
          textAlign="center"
          className="bookListContainer"
          loading={props.loading}
        >
          <Header textAlign="left" as="h2">
            Want To Read
          </Header>
          <BookList
            bookShelf={props.wantToRead}
            runAfterBookIsUpdated={props.moveBookToShelf}
          />
        </Segment>

        <Segment
          textAlign="center"
          className="bookListContainer"
          loading={props.loading}
        >
          <Header textAlign="left" as="h2">
            Currently Reading
          </Header>
          <BookList
            bookShelf={props.currentlyReading}
            runAfterBookIsUpdated={props.moveBookToShelf}
          />
        </Segment>

        <Segment
          textAlign="center"
          className="bookListContainer"
          loading={props.loading}
        >
          <Header textAlign="left" as="h2">
            Read
          </Header>
          <BookList
            bookShelf={props.read}
            runAfterBookIsUpdated={props.moveBookToShelf}
          />
        </Segment>
        <AddBook />
      </Segment.Group>
    </Container>
  );
}

BookShelves.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func
};

export default BookShelves;
