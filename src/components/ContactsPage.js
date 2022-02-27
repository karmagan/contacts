import React from "react";
import * as ContactsAPI from "../utils/ContactsAPI";
import ContactsList from "./ContactsList";
import ContactsSearch from "./ContactsSearch";

class ContactsPage extends React.Component {
  state = {
    contacts: [],
    selectedContacts: [],
    query: "",
    skip: 0,
    skipSelected: 0,
    loading: false,
    selectedAll: false,
  };

  //Initial loading of first 10 contacts
  componentDidMount() {
    this.searchContacts();
  }
  //When typed in the input field, resets the skip and contacts, then gets new results
  searchHandler = (query) => {
    this.setState({ contacts: [], query, skip: 0, loading: true }, () =>
      this.searchContacts()
    );
  };

  //When reach the bottom of the scroll, get the next 10 contacts from the server
  scrollHandler = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      this.setState({ skip: this.state.skip + 10, loading: true }, () =>
        this.searchContacts()
      );
    }
  };

  scrollSelectedHandler = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && this.state.selectedAll) {
      this.setState(
        { skipSelected: this.state.skipSelected + 10, loading: true },
        () => this.selectAll()
      );
    }
  };

  //Get the contacts from the server
  searchContacts = () => {
    ContactsAPI.search(this.state.query, this.state.skip).then((contacts) => {
      this.setState({
        contacts: [...this.state.contacts, ...contacts],
        loading: false,
      });
    });
  };

  selectAll = () => {
    ContactsAPI.search("", this.state.skipSelected).then((contacts) => {
      this.setState({
        selectedContacts: [...this.state.selectedContacts, ...contacts],
        loading: false,
      });
    });
  };

  //Add a contact to the selectedContacts list
  selectContact = (contact) => {
    const selectedContacts = this.state.selectedContacts;
    if (selectedContacts.filter((s) => s.id === contact.id).length === 0) {
      this.setState({ selectedContacts: [...selectedContacts, contact] });
    } else {
      this.setState({
        selectedContacts: selectedContacts.filter((s) => s.id !== contact.id),
      });
    }
  };

  // Toggle select all state
  toggleSelectAll = () => {
    this.setState(
      {
        selectedAll: !this.state.selectedAll,
        selectedContacts: [],
        skipSelected: 0,
      },
      () => {
        if (this.state.selectedAll === true) {
          this.selectAll();
        }
      }
    );
  };

  render() {
    return (
      <div className="contacts-page">
        <div className="contacts">
          <ContactsSearch searchHandler={this.searchHandler} />
          <h1>Contacts</h1>
          <h3>Showing {this.state.contacts.length} contacts</h3>
          <button onClick={this.toggleSelectAll}>
            {this.state.selectedAll === true ? `Deselect All` : `Select All`}
          </button>
          <div className="contacts-list " onScroll={this.scrollHandler}>
            <ContactsList
              selectContact={this.selectContact}
              selectedContacts={this.state.selectedContacts}
              contacts={this.state.contacts}
              selectedAll={this.state.selectedAll}
            />
          </div>
        </div>

        <div className="contacts">
          <h1>Selected Contacts</h1>
          <h3>
            Selected{" "}
            {this.state.selectedAll === true
              ? "all"
              : this.state.selectedContacts.length}{" "}
            contacts
          </h3>
          <div className="contacts-list" onScroll={this.scrollSelectedHandler}>
            <ContactsList
              selectContact={this.selectContact}
              selectedContacts={this.state.selectedContacts}
              contacts={this.state.selectedContacts}
              selectedAll={this.state.selectedAll}
            />
          </div>
        </div>
        <div className={this.state.loading ? "loading" : "loaded"}></div>
      </div>
    );
  }
}

export default ContactsPage;
