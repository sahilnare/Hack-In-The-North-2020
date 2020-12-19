import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import io from "socket.io-client";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import { styles } from '../components/materialui/styles';
import SideBar from '../components/drawer/SideBar';
import NavBar from '../components/appbar/NavBar';
import VoiceRoom from '../components/rooms/VoiceRoom';
import { getAllFriends, acceptRequest, rejectRequest, sendRequest, searchUser, clearSearch, friendOnline } from '../reduxStore/actions/userActions';
import { changeRoom } from '../reduxStore/actions/roomActions';
import { isOnline } from '../reduxStore/actions/authActions';
import { avatarArray } from '../utils/avatarImgLinks';


class Dashboard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      userSelected: false,
      searchUser: {}
    };
    this.socket = io.connect("/");
  }

  componentDidMount() {
    this.props.isOnline();
    this.socket.emit("user online", this.props.userData.username, this.props.userData._id);
    this.props.getAllFriends();
    // this.socket = io.connect("/");
    this.socket.on("friend online", friend => {
      console.log("Friend is here: ", friend);
      this.props.friendOnline(friend.id, friend.isOnline);
    });
    this.socket.on("connection update", friend => {
      console.log("Connection update: ", friend);
      this.props.getAllFriends();
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleRoomChange = (roomID) => {
    this.props.changeRoom(roomID);
  }

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  handleSend = (requester, recipient) => {
    this.props.sendRequest(requester, recipient, this.state.searchUser);
    this.setState({searchUser: {}, userSelected: false});
  }

  handleAccept = (requester, recipient, user) => {
    this.props.acceptRequest(requester, recipient, user);
  }

  handleReject = (requester, recipient, user) => {
    this.props.rejectRequest(requester, recipient, user);
  }

  handleSearchChange = (value) => {
    if(value.length > 0) {
      this.props.searchUser({username: value}, this.props.userData._id);
    } else {
      this.props.clearSearch();
    }
  }

  handleSearchSelect = (user) => {
    const {friends, requests, pending} = this.props;
    let allConnections = friends.concat(requests, pending);
    // console.log(allConnections);
    if(!user) {
      this.setState({searchUser: {}, userSelected: false});
    } else {
      if(allConnections.findIndex(friend => friend._id == user._id) < 0) {
        this.setState({searchUser: user, userSelected: true});
      }
      else {
        this.setState({searchUser: {}, userSelected: false});
      }
    }
  }

  render() {
    const {classes, userData, friends, requests, pending, usersFound, currentRoomId, isRoomSelected} = this.props;
    const {open, searchUser, userSelected} = this.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <>
      <div className={classes.root}>
        <NavBar
          classes={classes}
          open={open}
          userSelected={userSelected}
          searchUser={searchUser}
          usersFound={usersFound}
          handleSearchSelect={this.handleSearchSelect}
          handleSearchChange={this.handleSearchChange}
          handleSend={this.handleSend}
          handleDrawerOpen={this.handleDrawerOpen} />

        <SideBar
          classes={classes}
          handleDrawerClose={this.handleDrawerClose}
          handleRoomChange={this.handleRoomChange}
          handleAccept={this.handleAccept}
          handleReject={this.handleReject}
          friends={friends}
          requests={requests}
          pending={pending}
          currentRoomId={currentRoomId}
          open={open} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>

            {isRoomSelected ? (
              <VoiceRoom
                classes={classes}
                userData={userData}
                socket={this.socket}
                />
            ) : (
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                No room selected
              </Typography>
            )}

            {/*<Typography component="h2" variant="h6" color="primary" gutterBottom>
              Users in the room
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    User One
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    User Two
                  </Typography>
                </Paper>
              </Grid>
            </Grid>*/}
          </Container>
        </main>
      </div>
      </>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFriends: () => {
      dispatch(getAllFriends());
    },
    changeRoom: (roomID) => {
      dispatch(changeRoom(roomID));
    },
    sendRequest: (requester, recipient, user) => {
      dispatch(sendRequest(requester, recipient, user));
    },
    acceptRequest: (requester, recipient, user) => {
      dispatch(acceptRequest(requester, recipient, user));
    },
    rejectRequest: (requester, recipient, user) => {
      dispatch(rejectRequest(requester, recipient, user));
    },
    isOnline: () => {
      dispatch(isOnline());
    },
    friendOnline: (id, isOnline) => {
      dispatch(friendOnline(id, isOnline));
    },
    searchUser: (search, userId) => {
      dispatch(searchUser(search, userId));
    },
    clearSearch: () => {
      dispatch(clearSearch());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.userQuery.friends,
    pending: state.userQuery.pending,
    requests: state.userQuery.requests,
    userData: state.auth.userData,
    usersFound: state.userQuery.usersFound,
    currentRoomId: state.room.currentRoomId,
    isRoomSelected: state.room.isRoomSelected
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Dashboard);
