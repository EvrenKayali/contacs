import React from "react";
import { Contact } from "../Models/Contact";

export interface Props {
  contacts: Contact[];
}

export function ContactList(props: Props) {
  console.log(props.contacts);
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {props.contacts.map(contact => (
          <tr>
            <td>{contact.name}</td>
            <td>{contact.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
