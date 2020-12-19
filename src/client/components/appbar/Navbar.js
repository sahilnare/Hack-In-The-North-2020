import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logOut } from '../../reduxStore/actions/authActions';
import { withRouter } from 'react-router-dom'

class Navbar extends Component{

  constructor(props) {
    super(props);
  }

  logOut = () => {
    this.props.history.push('/');
    this.props.logOut();
  }

  render() {
    const {classes, open, userSelected, userData, searchUser, usersFound, handleSearchSelect, handleSearchChange, handleSend, handleDrawerOpen} = this.props;

    return (
      <>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
              {"Hello "}
              {userData.username}
              {"!"}
            </Typography>
            <div className={classes.grow}></div>
            {userSelected ? (
              <Button onClick={() => handleSend(userData._id, searchUser._id)} className={classes.buttonMargin} variant="contained" color="primary">
                Send Request
              </Button>
            ) : null}
            <Autocomplete
              id="search-box"
              options={usersFound}
              classes={{inputRoot: classes.inputRoot}}
              getOptionLabel={(option) => option.username}
              getOptionSelected={(option) => option.username}
              style={{ width: 300, marginRight: 48, color: "#fff" }}
              onChange={(event, value) => {
                handleSearchSelect(value);
              }}
              onInputChange={(event, value) => {
                handleSearchChange(value);
              }}
              renderInput={(params) => <TextField style={{color: "#fff"}} {...params} label="Search Users" variant="outlined" />}
            />
            <IconButton onClick={this.logOut} color="inherit">
                <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
