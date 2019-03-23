import React from "react";
import { ContactList } from "./Components/ContactList";
import { ContactsState } from "../../Store/Types";
import { AppState } from "../../Store";
import { connect } from "react-redux";
import { changeSelection } from "../../Store/Actions";
import { fetchContacts } from "./Services";
import ContactSearchInput from "./Components/ContactSearchInput";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export interface Props {
  contactState: ContactsState;
  changeSelection: typeof changeSelection;
  fetchContacts: (term?: string) => void;
}

export class Contacts extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchContacts();
  }

  onSearch = (searchTerm: string) => {
    if (searchTerm.length >= 3 || searchTerm.length == 0) {
      this.props.fetchContacts(searchTerm);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="row mt-3">
          <div className="col">
            <ContactSearchInput onSearch={term => this.onSearch(term)} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <ContactList
              contacts={this.props.contactState.contacts}
              selectionChanged={selectedContact =>
                this.props.changeSelection(selectedContact)
              }
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  contactState: state.contact
});

export default connect(
  mapStateToProps,
  { changeSelection, fetchContacts }
)(Contacts);
