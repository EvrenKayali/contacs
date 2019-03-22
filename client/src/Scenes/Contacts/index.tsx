import React from "react";
import { Contact } from "./Models/Contact";
import { ContactList } from "./Components/ContactList";
import ContactSearchInput from "./Components/ContactSearchInput";
import { Spinner } from "../../Components/Spinner";

export interface State {
  contacts: Contact[];
  searchTerm: string;
  isLoading: boolean;
  selectedContacts: number[];
}

export class Contacts extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      contacts: [],
      searchTerm: "",
      isLoading: false,
      selectedContacts: []
    };
  }

  toggleContactSelection = (selectedContact: Contact) => {
    const selectedContactIndex = this.state.selectedContacts.indexOf(
      selectedContact.id
    );

    const selectedContacts = selectedContact.isSelected
      ? [
          ...this.state.selectedContacts.slice(0, selectedContactIndex),
          ...this.state.selectedContacts.slice(selectedContactIndex + 1)
        ]
      : [...this.state.selectedContacts, selectedContact.id];

    this.setState({
      selectedContacts,
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
    this.setState({ isLoading: true });
    const uri =
      searchTerm == null
        ? "https://localhost:5001/api/contacts"
        : `https://localhost:5001/api/contacts?filter=${searchTerm}`;

    fetch(uri)
      .then(response => response.json())
      .then(result => {
        const contacts = result.map((c: Contact) => {
          return this.state.selectedContacts.some(sc => sc == c.id)
            ? { ...c, isSelected: true }
            : c;
        });
        this.setState({ contacts });
      });
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
              selectionChanged={contact => this.toggleContactSelection(contact)}
            />
            <Spinner isVisible={this.state.isLoading} />
          </div>
        </div>
        {this.state.selectedContacts}
      </React.Fragment>
    );
  }
}
