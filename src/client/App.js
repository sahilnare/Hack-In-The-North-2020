import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/forms/LoginPage';
import SignupPage from './pages/forms/SignupPage';

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
              <Switch>
                <Route
                  path='/'
                  exact
                  render={(props) => <Home {...props} />}
                />
                <Route
                  path='/app'
                  exact
                  render={(props) => <Dashboard {...props} />}
                />
                <Route
                  path='/login'
                  exact
                  render={(props) => <LoginPage {...props} />}
                />
                <Route
                  path='/signup'
                  exact
                  render={(props) => <SignupPage {...props} />}
                />
              </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
