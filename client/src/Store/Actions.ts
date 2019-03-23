import { POPULATE_CONTACTS, CHANGE_SELECTION } from "./Types";
import { Contact } from "../Scenes/Contacts/Models/Contact";

export function populateContacts(contacts: Contact[]) {
  return {
    type: POPULATE_CONTACTS,
    payload: contacts
  };
}

export function changeSelection(contact: Contact) {
  return {
    type: CHANGE_SELECTION,
    payload: contact
  };
}
