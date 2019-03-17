import React from "react";
import { Contact } from "./Models/Contact";
import { ContactList } from "./Components/ContactList";
import ContactSearchInput from "./Components/ContactSearchInput";
import { Subject, from, Observable, BehaviorSubject } from "rxjs";
import {
  debounceTime,
  filter,
  switchMap,
  distinctUntilChanged,
  first
} from "rxjs/operators";

export interface State {
  contacts: Contact[];
  searchTerm: string;
}

export class Contacts extends React.Component<any, State> {
  searchTerm$: Subject<string>;

  constructor(props: any) {
    super(props);

    this.searchTerm$ = new Subject();

    this.state = {
      contacts: [],
      searchTerm: ""
    };
  }

  contactSelected = (selectedContact: Contact) => {
    this.setState({
      contacts: this.state.contacts.map(contact => {
        return contact.id === selectedContact.id
          ? { ...contact, isSelected: !contact.isSelected }
          : contact;
      })
    });
  };

  handleSearchTermChange = (searchTerm: string) => {
    this.setState({ searchTerm });
    this.searchTerm$.next(searchTerm);
  };

  componentDidMount() {
    this.searchTerm$
      .pipe(
        debounceTime(500),
        filter(query => query.length > 2 || query.length === 0),
        distinctUntilChanged(),
        switchMap(t => this.fetchContacts(t))
      )
      .subscribe(contacts => this.setState({ contacts }));

    this.fetchContacts("")
      .pipe(first())
      .subscribe(contacts => this.setState({ contacts }));
  }

  componentWillUnmount() {
    if (this.searchTerm$) {
      this.searchTerm$.unsubscribe();
    }
  }

  fetchContacts = (searchTerm: string | undefined) => {
    const uri =
      searchTerm === undefined
        ? "https://localhost:5001/api/contacts"
        : `https://localhost:5001/api/contacts?filter=${searchTerm}`;

    const promise = fetch(uri).then(response => response.json());

    return from(promise);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row mt-3">
          <div className="col">
            <ContactSearchInput
              onSearch={term => this.handleSearchTermChange(term)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <ContactList
              contacts={this.state.contacts}
              selectionChanged={contact => this.contactSelected(contact)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
