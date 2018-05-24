import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import AddBar from "./components/add_bar.js";
import CryptoList from "./components/crypto_list.js";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";

class App extends Component {
  notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Let's check whether notification permissions have already been granted
      // If it's okay let's create a notification
      //var notification = new Notification("Hi there!");
    } else if (Notification.permission !== "denied") {
      // Otherwise, we need to ask the user for permission
      Notification.requestPermission(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          //var notification = new Notification("Hi there!");
        }
      });
    }
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }
  componentDidMount() {
    this.notifyMe();
  }
  render() {
    return (
      <div>
        <AddBar />
        <CryptoList />
      </div>
    );
  }
}

export default App;
