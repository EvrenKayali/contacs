import {
  ContactsState,
  ContactActionTypes,
  POPULATE_CONTACTS,
  CHANGE_SELECTION
} from "./Types";

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  searchTerm: "",
  selectedContacts: [],
  contact: undefined
};

export function contactReducer(
  state = initialState,
  action: ContactActionTypes
): ContactsState {
  switch (action.type) {
    case POPULATE_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    case CHANGE_SELECTION:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id == action.payload.id
            ? { ...contact, isSelected: !contact.isSelected }
            : contact
        )
      };
    default:
      return state;
  }
}
