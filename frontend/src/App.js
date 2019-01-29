import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/" component={Auth} />
        </Switch>
      </Router>
    );
  }
}

export default App;
