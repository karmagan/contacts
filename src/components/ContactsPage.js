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
    loading: false,
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

  //Get the contacts from the server
  searchContacts = () => {
    ContactsAPI.search(this.state.query, this.state.skip).then((contacts) => {
      this.setState({
        contacts: [...this.state.contacts, ...contacts],
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

  //Add all the contacts from the server to the selectedContacts list
  selectAll = () => {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({
        selectedContacts: contacts,
      });
    });
  };

  render() {
    return (
      <div className="contacts-page">
        <div className="contacts-pane">
          <ContactsSearch searchHandler={this.searchHandler} />
          <h1>Contacts</h1>
          <h3>Showing {this.state.contacts.length} contacts</h3>
          <button onClick={this.selectAll}>Select All</button>
          <div className="contacts-list " onScroll={this.scrollHandler}>
            <ContactsList
              selectContact={this.selectContact}
              selectedContacts={this.state.selectedContacts}
              contacts={this.state.contacts}
            />
          </div>
        </div>

        <div className="selected-contacts">
          <h1>Selected Contacts</h1>
          <ContactsList
            selectContact={this.selectContact}
            selectedContacts={this.state.selectedContacts}
            contacts={this.state.selectedContacts}
          />
        </div>
        <div className={this.state.loading ? "loading" : "loaded"}></div>
      </div>
    );
  }
}

export default ContactsPage;
