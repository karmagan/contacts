import React from "react";

class ContactsSearch extends React.Component {
  state = {
    query: "",
  };
  updateInput = (e) => {
    const value = e.target.value.replace(/\s+/g, " ").trim();
    this.setState({ query: e.target.value },()=>this.props.searchHandler(this.state.query));
  };
  render() {
    return (
      <div className="contacts-search">
        <input
          value={this.state.query}
          onChange={this.updateInput}
          type="text"
          placeholder="Type to search contacts"
        />
      </div>
    );
  }
}

export default ContactsSearch;
