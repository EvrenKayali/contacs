import React from "react";
import { Contact } from "./Models/Contact";
import { ContactList } from "./Components/ContactList";

export interface State {
  contacts: Contact[];
}

export class Contacts extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      contacts: []
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

  componentDidMount() {
    fetch("https://localhost:5001/api/contacts")
      .then(response => response.json())
      .then(contacts => this.setState({ contacts }));
  }

  render() {
    return (
      <ContactList
        contacts={this.state.contacts}
        selectionChanged={contact => this.contactSelected(contact)}
      />
    );
  }
}
