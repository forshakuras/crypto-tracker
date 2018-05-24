import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCryptoData } from "../actions/index";
import "./../App.css";
import _ from "lodash";

class AddBar extends Component {
  componentDidMount() {
    this.props.fetchCryptoData();
    this.setState({
      interval: setInterval(this.checkCurrentPrice, 3600000)
    });
    /*this.fetchTimer = setInterval(
      () => this.checkCurrentPrice(),
      this.state.frequency
    );*/
    this.checkCurrentPrice();
  }
  constructor(props) {
    super(props);
    this.state = { cryptoToWatch: "", interval: f => f };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFreqChange = this.onFreqChange.bind(this);
    this.checkCurrentPrice = this.checkCurrentPrice.bind(this);
  }
  checkCurrentPrice() {
    this.props.fetchCryptoData().then(function(data) {
      let cryptoStore = new Map(
        JSON.parse(localStorage.getItem("cryptoStore"))
      );
      let priceData = _.mapKeys(data.payload.data.data, "symbol");
      let lowCrypto = [];
      let highCrypto = [];
      cryptoStore.forEach(function(value, key, mapObj) {
        if (
          !isNaN(parseInt(value.low)) &&
          priceData[key].quotes.USD.price < parseInt(value.low)
        ) {
          lowCrypto.push(priceData[key].name);
        } else if (
          !isNaN(parseInt(value.high)) &&
          priceData[key].quotes.USD.price > parseInt(value.high)
        ) {
          highCrypto.push(priceData[key].name);
        }
      });
      let lowString = "";
      if (lowCrypto.length > 0) {
        for (let i = 0; i < lowCrypto.length; i++) {
          if (i == lowCrypto.length - 1 && lowCrypto.length > 1) {
            lowString += lowCrypto[i];
          } else if (lowCrypto.length > 1) {
            lowString += lowCrypto[i] + ", ";
          } else {
            lowString += lowCrypto[i];
          }
        }
        if (lowCrypto.length > 1) {
          lowString += " are below your low limit";
        } else {
          lowString += " is below your low limit";
        }
      }
      let highString = "";
      if (highCrypto.length > 0) {
        for (let i = 0; i < highCrypto.length; i++) {
          if (i == highCrypto.length - 1 && highCrypto.length > 1) {
            highString += highCrypto[i];
          } else if (highCrypto.length > 1) {
            highString += highCrypto[i] + ", ";
          } else {
            highString += highCrypto[i];
          }
        }
        if (highCrypto.length > 1) {
          highString += " are above your high limit";
        } else {
          highString += " is above your high limit";
        }
      }
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        // Let's check whether notification permissions have already been granted
        // If it's okay let's create a notification
        if (lowString != "") var notification = new Notification(lowString);
        if (highString != "") var notification = new Notification(highString);
      } else if (Notification.permission !== "denied") {
        // Otherwise, we need to ask the user for permission
        Notification.requestPermission(function(permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            if (lowString != "") var notification = new Notification(lowString);
            if (highString != "")
              var notification = new Notification(highString);
          }
        });
      }
    });
  }
  onInputChange(event) {
    this.setState({ cryptoToWatch: event.target.value });
  }
  onFormSubmit(event) {
    event.preventDefault();
    let cryptoStore = new Map(JSON.parse(localStorage.getItem("cryptoStore")));
    if (localStorage.getItem("cryptoStore")) {
      if (!cryptoStore.get(this.state.cryptoToWatch.toUpperCase())) {
        cryptoStore.set(this.state.cryptoToWatch.toUpperCase(), {
          high: "",
          low: ""
        });
        localStorage.setItem(
          "cryptoStore",
          JSON.stringify(Array.from(cryptoStore.entries()))
        );
      }
    } else {
      cryptoStore = new Map();
      cryptoStore.set(this.state.cryptoToWatch.toUpperCase(), {
        high: "",
        low: ""
      });
      localStorage.setItem(
        "cryptoStore",
        JSON.stringify(Array.from(cryptoStore.entries()))
      );
    }
    this.props.fetchCryptoData();
    this.setState({ cryptoToWatch: "" });
  }
  onFreqChange(event) {
    clearInterval(this.state.interval);
    this.setState({
      interval: setInterval(
        this.checkCurrentPrice,
        parseInt(event.target.value)
      )
    });
  }
  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Add a crypto to track"
          className="form-control"
          value={this.state.cryptoToWatch}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button
            onClick={this.onFormSubmit}
            type="button"
            className="btn btn-secondary"
          >
            Add
          </button>
        </span>
        <select onChange={this.onFreqChange} defaultValue="3600000">
          <option value="1800000">Half hour</option>
          <option value="3600000">1 Hour</option>
          <option value="7200000">2 Hours</option>
          <option value="14400000">4 Hours</option>
        </select>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCryptoData }, dispatch);
}
export default connect(null, mapDispatchToProps)(AddBar);
