import React from "react";
import { Contact } from "./Models/Contact";
import { ContactList } from "./Components/ContactList";
import ContactSearchInput from "./Components/ContactSearchInput";

export interface State {
  contacts: Contact[];
  searchTerm: string;
}

export class Contacts extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      contacts: [],
      searchTerm: ""
    };
  }

  contactSelected = (selectedContact: Contact) => {
    this.setState({
      contacts: this.state.contacts.map(contact => {
        return contact.id === selectedContact.id
          ? { ...contact, isSelected: !contact.isSelected }
          : contact;
      })
    });
  };

  handleSearchTermChange = (searchTerm: string) => {
    if (searchTerm.length >= 3 || searchTerm.length == 0) {
      this.setState({ searchTerm });
      this.fetchContacts(searchTerm);
    }
  };

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts = (searchTerm?: string) => {
    const uri =
      searchTerm == null
        ? "https://localhost:5001/api/contacts"
        : `https://localhost:5001/api/contacts?filter=${searchTerm}`;

    fetch(uri)
      .then(response => response.json())
      .then(contacts => this.setState({ contacts }));
  };

  render() {
    return (
      <React.Fragment>
        <div className="row mt-3">
          <div className="col">
            <ContactSearchInput
              onSearch={term => this.handleSearchTermChange(term)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <ContactList
              contacts={this.state.contacts}
              selectionChanged={contact => this.contactSelected(contact)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
