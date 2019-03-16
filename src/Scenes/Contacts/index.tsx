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
      contacts: [
        { name: "Evren", phoneNumber: "5326107664" },
        { name: "Kaya", phoneNumber: "4146028" }
      ]
    };
  }

  render() {
    return <ContactList contacts={this.state.contacts} />;
  }
}
