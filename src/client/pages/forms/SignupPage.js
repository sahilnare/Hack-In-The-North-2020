import React, {Component} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v1 as uuid } from "uuid";
import { signUpUser } from '../../reduxStore/actions/authActions';
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

class SignupPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      phone: '',
      usnmcheck: true,
      passcheck: true,
      phcheck: true,
      termsCheck: false,
      userErrMsg: '',
      passErrMsg: '',
      phoneErrMsg: '',
      termsErrMsg: ''
    };
    this.baseState = this.state;
  }

  handleCheck = (e) => {
    const { checked } = e.target;
    this.setState({termsCheck: checked});
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
      case "phone":
        {
          if(value.length <= 0) {
            this.setState({phcheck: false, phoneErrMsg: "Mobile number should not be empty"});
          }
          else {
            this.setState({phcheck: true, phoneErrMsg: ""});
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
    const {username, password, phone, termsCheck} = this.state;
    const signupCallback = () => {
      this.props.history.push('/app');
    }
    const roomId = uuid();

    if(username.length <= 0) {
      this.setState({usnmcheck: false, userErrMsg: "Username should not be empty"});
    }
    if(password.length <= 0) {
      this.setState({passcheck: false, passErrMsg: "Password should not be empty"});
    }
    if(phone.length <= 0) {
      this.setState({phcheck: false, phoneErrMsg: "Mobile number should not be empty"});
    }
    if(!termsCheck) {
      this.setState({termsErrMsg: "Please select the terms and conditions checkbox."});
    }

    if(username.length > 0 && password.length > 0 && phone.length > 0 && termsCheck) {
      this.props.signUpUser({username: this.state.username, password: this.state.password, phone: this.state.phone, roomId: roomId}, signupCallback);
      // this.setState(this.baseState);
    }
  }

  render() {
    const { usnmcheck, passcheck, phcheck, termsCheck, termsErrMsg } = this.state;
    const { signupError, classes } = this.props;
    let userHelper = this.state.userErrMsg;
    let passHelper = this.state.passErrMsg;
    let phoneHelper = this.state.phoneErrMsg;
    let signErrFlag = false;
    if(signupError) {
      if(signupError === "User already exists") {
        userHelper = signupError;
        signErrFlag = true;
      }
      else if(signupError === "Invalid phone number") {
        phoneHelper = signupError;
        signErrFlag = true;
      }
      else if(signupError === "Password too short") {
        passHelper = signupError;
        signErrFlag = true;
      }
      else {
        userHelper = signupError;
        passHelper = signupError;
        phoneHelper = signupError;
        signErrFlag = true;
      }
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
                Sign Up
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={signErrFlag || !usnmcheck}
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
                  error={signErrFlag || !phcheck}
                  onChange={this.handleChange}
                  helperText={phoneHelper}
                  value={this.state.phone}
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  autoComplete="phone"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={signErrFlag || !passcheck}
                  onChange={this.handleChange}
                  helperText={passHelper}
                  value={this.state.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              <Grid container alignItems="center">
                  <Grid item xs>
                    <FormControlLabel
                      control={<Checkbox checked={termsCheck} onChange={this.handleCheck} color="primary" />}
                      label="I agree to the Terms and Conditions"
                    />
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} color="secondary" to="/termsandconditions" variant="body1">
                      {"Terms and Conditions"}
                    </Link>
                  </Grid>
                </Grid>
                {
                  termsErrMsg.length > 0 ? (
                    <Typography variant="subtitle2" style={{color: "#FF2C61"}}>
                      {termsErrMsg}
                    </Typography>
                  ) : null
                }
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={this.handleSubmit}
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link component={RouterLink} color="secondary" to="/getinvite" variant="body1">
                      {"Want an invite code?"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} color="secondary" to="/login" variant="body1">
                      {"Already have an account? Log in"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
        {/*<h1>Sign up</h1>

        <div>
          <input type="text" name="username" onChange={this.handleChange} placeholder="Username" />
          <input type="password" name="password" onChange={this.handleChange} placeholder="Password" />
          <input type="text" name="phone" onChange={this.handleChange} placeholder="Mobile Number" />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <div>
          {!passcheck ? <p>Password should not be empty</p> : null}
          {!usnmcheck ? <p>Username should not be empty</p> : null}
          {!phcheck ? <p>Phone should not be empty</p> : null}
        </div>
        <div>
          {signupError ? <p>{signupError}</p> : null}
        </div>*/}

      </>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    signupError: state.auth.signupError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (cred, signupCallback) => {
      dispatch(signUpUser(cred, signupCallback));
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SignupPage);
