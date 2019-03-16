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

  componentDidMount() {
    fetch("https://localhost:5001/api/contacts")
      .then(response => response.json())
      .then(contacts => this.setState({ contacts }));
  }

  render() {
    return <ContactList contacts={this.state.contacts} />;
  }
}
