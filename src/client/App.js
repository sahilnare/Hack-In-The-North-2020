import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from './reduxStore/actions/authActions';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/forms/LoginPage';
import SignupPage from './pages/forms/SignupPage';
import InvitePage from './pages/forms/InvitePage';
import Footer from './components/footer/Footer';

class App extends Component {

  componentDidMount() {
    this.props.isLoggedIn();
  }

  render() {
    // const {authorized, username} = this.state;
    const {isAuthenticated} = this.props;
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
              render={(props) => isAuthenticated ? <Dashboard {...props} /> : <Redirect to="/login" />}
            />
            <Route
              path='/login'
              exact
              render={(props) => !isAuthenticated ? <LoginPage {...props} /> : <Redirect to="/" />}
            />
            <Route
              path='/signup'
              exact
              render={(props) => !isAuthenticated ? <SignupPage {...props} /> : <Redirect to="/" />}
            />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: () => {
      dispatch(isLoggedIn());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
