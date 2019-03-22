import React from "react";
import { shallow } from "enzyme";
import { ContactList } from "../Scenes/Contacts/Components/ContactList";
import { Contact } from "../Scenes/Contacts/Models/Contact";
import { Footer } from "../Components/Footer";

it("renders without crashing", () => {
  const props = {
    contacts: [
      { id: 1, name: "Evren Kayali", phoneNumber: "238928", isSelected: false }
    ],
    selectionChanged: (selectedContact: Contact) => {
      console.log(selectedContact);
    }
  };

  shallow(<ContactList {...props} />);
});

it("renders footer section", () => {
  const wrapper = shallow(<Footer />);
  wrapper.contains(<footer />);
});
