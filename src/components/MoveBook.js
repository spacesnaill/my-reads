import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { update, get } from "../BooksApi";
import PropTypes from "prop-types";

class MoveBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shelfBookBelongsTo: ""
    };
  }

  moveBookToShelf = (book, destinationShelfName, runAfterUpdate) => {
    update(book, destinationShelfName).then(result => {
      if (runAfterUpdate) {
        runAfterUpdate({
          book: this.props.book,
          origin: this.state.shelfBookBelongsTo,
          destination: destinationShelfName
        });
      }
      this.setState({ shelfBookBelongsTo: destinationShelfName });
    });
  };

  componentDidMount() {
    get(this.props.book.id).then(response => {
      this.setState({ shelfBookBelongsTo: response.shelf || "" });
    });
  }

  render() {
    return (
      <Dropdown text="Move Book to. . .">
        <Dropdown.Menu>
          {this.props.bookShelves.map(bookShelf => {
            return (
              <Dropdown.Item
                key={bookShelf.name}
                disabled={bookShelf.name === this.state.shelfBookBelongsTo}
                onClick={event => {
                  this.moveBookToShelf(
                    this.props.book,
                    bookShelf.name,
                    this.props.runAfterBookIsUpdated
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
}

MoveBook.propTypes = {
  bookShelves: PropTypes.array.isRequired,
  shelfName: PropTypes.string,
  book: PropTypes.object.isRequired,
  runAfterBookIsUpdated: PropTypes.func
};

export default MoveBook;
