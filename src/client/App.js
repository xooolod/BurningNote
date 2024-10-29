import React, { Component } from 'react';
import './app.css';

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main />
      </div>
    );
  }
}