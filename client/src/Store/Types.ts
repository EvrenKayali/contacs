import { Contact } from "../Scenes/Contacts/Models/Contact";

export interface ContactsState {
  contacts: Contact[];
  searchTerm: string;
  isLoading: boolean;
  selectedContacts: Contact[];
  contact: Contact | undefined;
}

export const POPULATE_CONTACTS = "POPULATE_CONTACTS";
export const SELECT_CONTACTS = "SELECT_CONTACTS";
export const CHANGE_SELECTION = "CHANGE_SELECTION";

interface FetcContactsAction {
  type: typeof POPULATE_CONTACTS;
  payload: Contact[];
}

interface ChangeSelectionAction {
  type: typeof CHANGE_SELECTION;
  payload: Contact;
}

export type ContactActionTypes = FetcContactsAction | ChangeSelectionAction;
