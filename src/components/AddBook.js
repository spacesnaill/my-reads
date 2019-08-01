import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function AddBook(props) {
  return (
    <Link to="/BookSearch">
      <Button className="add-book-button">&#43; Add Book</Button>
    </Link>
  );
}

export default AddBook;
