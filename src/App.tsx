import React, { Component } from "react";
import { Contacts } from "./Components/Contacts";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main role="main" className="container">
          <Contacts />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
