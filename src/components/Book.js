import React from "react";
import PropTypes from "prop-types";
import { Rating, Image, Card } from "semantic-ui-react";
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
        <Card.Description>
          Rating:{" "}
          <Rating
            defaultRating={props.averageRating}
            maxRating={5}
            icon="heart"
            disabled
          />
          ({props.ratingsCount || 0})
        </Card.Description>
      </Card.Content>
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Book;
