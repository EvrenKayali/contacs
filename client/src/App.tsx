import React, { Component } from "react";
import { Provider } from "react-redux";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Home } from "./Scenes/Home";
import configureStore from "./Store";

import "./App.css";
import Contacts from "./Scenes/Contacts";

export interface State {
  page: string;
}

export interface Props {}

const store = configureStore();

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
      <Provider store={store}>
        <div className="App">
          <Header pageClick={this.pageClick} />
          <main role="main" className="container">
            {this.state.page == "Contacts" && <Contacts />}
            {this.state.page == "Home" && <Home />}
          </main>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
