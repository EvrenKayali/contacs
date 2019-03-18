import React, { Component } from "react";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Contacts } from "./Scenes/Contacts";

import "./App.css";
import { Home } from "./Scenes/Home";
import { throws } from "assert";

export interface State {
  page: string;
}

export interface Props {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: "Home"
    };
  }

  pageClick = (page: string) => {
    this.setState({ page });
  };

  render() {
    return (
      <div className="App">
        <Header pageClick={this.pageClick} />
        <main role="main" className="container">
          {this.state.page == "Contacts" && <Contacts />}
          {this.state.page == "Home" && <Home />}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
