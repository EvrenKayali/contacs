import { ThunkAction } from "redux-thunk";
import { AppState } from "../../../Store";
import { Action } from "redux";
import { Contact } from "../Models/Contact";
import { populateContacts } from "../../../Store/Actions";

export const fetchContacts = (
  searchTerm?: string
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  const uri =
    searchTerm == null
      ? "https://localhost:5001/api/contacts"
      : `https://localhost:5001/api/contacts?filter=${searchTerm}`;

  fetch(uri)
    .then(response => response.json())
    .then((contacts: Contact[]) => dispatch(populateContacts(contacts)));
};
