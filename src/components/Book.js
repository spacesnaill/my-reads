import React from "react";
import PropTypes from "prop-types";
import { Image, Card } from "semantic-ui-react";
function Book(props) {
  return (
    <div>
      <Image
        centered
        alt="{props.title} Book Cover"
        src={props.image}
        width={100}
        height={160}
        className="book-cover"
      />
      <Card.Content>
        <Card.Header as="h3">{props.title}</Card.Header>
      </Card.Content>
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Book;
