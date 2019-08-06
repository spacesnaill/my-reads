import React, { Component } from "react";
import { Input, Button, Search } from "semantic-ui-react";

class SearchForBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  onSearchInputChange = event => {
    this.setState({ input: event.target.value });
    this.props.onSearchInputChange(this.state.input);
  };

  render() {
    return (
      <form>
        <Input
          value={this.state.input}
          placeholder="Search for books"
          onChange={this.onSearchInputChange}
          action={{ content: "Search" }}
        />
      </form>
    );
  }
}

export default SearchForBook;
