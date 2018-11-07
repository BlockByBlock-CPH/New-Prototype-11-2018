import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeContainer from './components/ecosystems/HomeContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={HomeContainer} />
      </Router>
    );
  }
}

export default App;
