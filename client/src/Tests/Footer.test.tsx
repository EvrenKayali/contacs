import React from "react";
import { shallow } from "enzyme";
import { Footer } from "../Components/Footer";

it("renders without crashing", () => {
  shallow(<Footer />);
});

it("renders footer section", () => {
  const wrapper = shallow(<Footer />);
  wrapper.contains(<footer />);
});
