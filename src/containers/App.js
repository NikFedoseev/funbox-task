import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Map from './Map';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes/>
        <Map/>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    route: store.route
  }
}

export default connect(mapStateToProps)(App);
