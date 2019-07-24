import React from "react";
import PropTypes from "prop-types";

function Book(props) {
  return (
    <div>
      <img alt="{props.title} Book Cover" src={props.image} />
      <p>{props.title}</p>
    </div>
  );
}

Book.prototype = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Book;
