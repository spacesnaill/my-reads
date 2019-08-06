import React, { Component } from "react";
import { Input, Button, Search } from "semantic-ui-react";

class SearchForBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  onSearchInputChange = content => {
    this.setState({ input: content });
  };

  render() {
    return (
      <form>
        <Input
          value={this.state.input}
          placeholder="Search for books"
          action={{ content: "Search" }}
          onChange={event => {
            this.onSearchInputChange(event.target.content);
          }}
        />
      </form>
    );
  }
}

export default SearchForBook;
