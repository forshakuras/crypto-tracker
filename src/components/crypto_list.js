import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CryptoList extends Component {
  constructor() {
    super();
    let store = new Map(JSON.parse(localStorage.getItem("cryptoStore")));
    this.state = {
      cryptoStore: store
    };
    this.renderCrypto = this.renderCrypto.bind(this);
    this.updateLow = this.updateLow.bind(this);
    this.updateHigh = this.updateHigh.bind(this);
  }

  componentDidUpdate() {
    let store = new Map(JSON.parse(localStorage.getItem("cryptoStore")));
    if (this.state.cryptoStore.size != store.size) {
      let store = new Map(JSON.parse(localStorage.getItem("cryptoStore")));
      this.setState({ cryptoStore: store });
    }
  }

  updateLow(name, event) {
    let store = this.state.cryptoStore;
    let updatedData = store.get(name);
    updatedData.low = event.target.value;
    store.set(name, updatedData);
    localStorage.setItem(
      "cryptoStore",
      JSON.stringify(Array.from(store.entries()))
    );
  }
  updateHigh(name, event) {
    let store = this.state.cryptoStore;
    let updatedData = store.get(name);
    updatedData.high = event.target.value;
    store.set(name, updatedData);
    localStorage.setItem(
      "cryptoStore",
      JSON.stringify(Array.from(store.entries()))
    );
  }
  renderCrypto(cryptoData) {
    if (this.state.cryptoStore.has(cryptoData.symbol)) {
      return (
        <tr key={cryptoData.symbol}>
          <td>{cryptoData.name}</td>
          <td>{cryptoData.quotes.USD.price}</td>
          <td>
            <input
              type="number"
              defaultValue={this.state.cryptoStore.get(cryptoData.symbol).high}
              onBlur={this.updateHigh.bind(this, cryptoData.symbol)}
            />
          </td>
          <td>
            <input
              type="number"
              defaultValue={this.state.cryptoStore.get(cryptoData.symbol).low}
              onBlur={this.updateLow.bind(this, cryptoData.symbol)}
            />
          </td>
        </tr>
      );
    }
  }
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Crypto Name</th>
            <th>Current Price ($USD)</th>
            <th>High price track ($USD)</th>
            <th>Low price track ($USD)</th>
          </tr>
        </thead>
        <tbody>{this.props.cryptoData.map(this.renderCrypto)}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ cryptoData }) {
  return { cryptoData };
}
export default connect(mapStateToProps)(CryptoList);
