import React from "react";
import { Contact } from "../Models/Contact";

export interface Props {
  contacts: Contact[];
  selectionChanged: (selectedContact: Contact) => void;
}

export function ContactList(props: Props) {
  const selectionChange = (selectedContact: Contact) => {
    props.selectionChanged(selectedContact);
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {props.contacts.map(contact => (
          <tr
            key={contact.id}
            style={{ backgroundColor: contact.isSelected ? "#ccc" : "" }}
          >
            <td>
              <input
                type="checkbox"
                checked={contact.isSelected != undefined && contact.isSelected}
                onChange={() => selectionChange(contact)}
              />
            </td>
            <td>{contact.name}</td>
            <td>{contact.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
