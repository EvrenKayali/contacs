import React from "react";
import { Contact } from "./Models/Contact";
import { ContactList } from "./Components/ContactList";
import { ContactsState } from "../../Store/Types";
import { AppState } from "../../Store";
import { connect } from "react-redux";
import { changeSelection } from "../../Store/Actions";
import { fetchContacts } from "./Services";
import { throws } from "assert";

export interface Props {
  contactState: ContactsState;
  changeSelection: typeof changeSelection;
  fetchContacts: any;
}

export class Contacts extends React.Component<Props> {
  toggleContactSelection = (selectedContact: Contact) => {
    this.props.changeSelection(selectedContact);
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mt-3">
          <div className="col" />
        </div>
        <div className="row mt-3">
          <div className="col">
            <ContactList
              contacts={this.props.contactState.contacts}
              selectionChanged={e => this.toggleContactSelection(e)}
            />
          </div>
        </div>
        {JSON.stringify(this.props.contactState.contact)}
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
