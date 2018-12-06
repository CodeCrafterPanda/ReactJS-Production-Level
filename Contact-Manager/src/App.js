import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddContact from './components/contacts/AddContact';
import AddNote from './components/notes/AddNote';
import EditContact from './components/contacts/EditContact';
import ContactDetails from './components/contacts/ContactDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/contact/add"
                  component={UserIsAuthenticated(AddContact)}
                />

                <Route
                  exact
                  path="/contact/edit/:id"
                  component={UserIsAuthenticated(EditContact)}
                />
                <Route
                  exact
                  path="/contact/:id"
                  component={UserIsAuthenticated(ContactDetails)}
                />
                <Route
                  exact
                  path="/note/add"
                  component={UserIsAuthenticated(AddNote)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
