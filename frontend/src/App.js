import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import MainNavigation from './components/Navigation/MainNavigation';
import Bookings from './pages/Bookings';
import Events from './pages/Events';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <MainNavigation />
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/bookings" component={Bookings} />
            <Route exact path="/events" component={Events} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
