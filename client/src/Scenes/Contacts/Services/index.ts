import { ThunkAction } from "redux-thunk";
import { AppState } from "../../../Store";
import { Action } from "redux";
import { Contact } from "../Models/Contact";
import { populateContacts } from "../../../Store/Actions";

export const fetchContacts = (): ThunkAction<
  void,
  AppState,
  null,
  Action
> => async dispatch => {
  fetch("https://localhost:5001/api/contacts")
    .then(response => response.json())
    .then((contacts: Contact[]) => dispatch(populateContacts(contacts)));
};
