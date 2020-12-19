import React, {Component} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logInUser } from '../../reduxStore/actions/authActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../components/materialui/styles';

class LoginPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usnmcheck: true,
      passcheck: true,
      userErrMsg: '',
      passErrMsg: ''
    };
    this.baseState = this.state;
  }

  handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    switch(name) {
      case "username":
        {
          if(value.length <= 0) {
            this.setState({usnmcheck: false, userErrMsg: "Username should not be empty"});
          }
          else {
            this.setState({usnmcheck: true, userErrMsg: ""});
          }
          break
        }

        case "password":
          {
            if(value.length <= 0) {
              this.setState({passcheck: false, passErrMsg: "Password should not be empty"});
            }
            else {
              this.setState({passcheck: true, passErrMsg: ""});
            }
            break
          }
        default:
          break
    }
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {username, password} = this.state;
    const loginCallback = () => {
      this.props.history.push('/app');
    }

    if(username.length <= 0) {
      this.setState({usnmcheck: false, userErrMsg: "Username should not be empty"});
    }
    if(password.length <= 0) {
      this.setState({passcheck: false, passErrMsg: "Password should not be empty"});
    }

    if(username.length > 0 && password.length > 0) {
      this.props.logInUser({username: this.state.username, password: this.state.password}, loginCallback);
      // this.setState(this.baseState);
    }
  }

  render() {
    const { usnmcheck, passcheck } = this.state;
    const { loginError, classes } = this.props;
    let userHelper = this.state.userErrMsg;
    let passHelper = this.state.passErrMsg;
    let logErrFlag = false;
    if(loginError) {
      userHelper = loginError;
      passHelper = loginError;
      logErrFlag = true;
    }

    return (
      <>
        <Grid container component="main" justify="center" alignItems="center" className={classes.formRoot}>
          <Grid item xs={11} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.formPaper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={logErrFlag || !usnmcheck}
                  onChange={this.handleChange}
                  helperText={userHelper}
                  value={this.state.username}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={logErrFlag || !passcheck}
                  onChange={this.handleChange}
                  helperText={passHelper}
                  value={this.state.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={this.handleSubmit}
                  className={classes.submit}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link component={RouterLink} color="secondary" to="/signup" variant="body1">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} color="secondary" to="/getinvite" variant="body1">
                      {"Want an invite code?"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
        {/*<h1>Log in</h1>

        <div>
          <input type="text" name="username" onChange={this.handleChange} placeholder="Username" />
          <input type="password" name="password" onChange={this.handleChange} placeholder="Password" />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <div>
          {!passcheck ? <p>Password should not be empty</p> : null}
          {!usnmcheck ? <p>Username should not be empty</p> : null}
        </div>
        <div>
          {loginError ? <p>{loginError}</p> : null}
        </div>*/}

      </>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    loginError: state.auth.loginError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (cred, loginCallback) => {
      dispatch(logInUser(cred, loginCallback));
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(LoginPage);
