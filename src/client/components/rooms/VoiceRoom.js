import React, {Component}  from 'react'
import { connect } from 'react-redux';
import clsx from 'clsx';
import { e, log } from '../../utils/utils'
import {startBasicCall, leaveCall} from '../agora/Agora_RTC_Audio';
import Grid from '@material-ui/core/Grid';
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { agoraLoadingOn, agoraLoadingOff } from '../../reduxStore/actions/loadingActions';
import { avatarArray } from '../../utils/avatarImgLinks';

class VoiceRoom extends Component {
  constructor() {
    super();
    this.state = {
      appid: 'ad766a71a8134ab1b3c3a00028b8b89b',
      channel: '',
      token: null,
      isjoin: false,
      agoraID: '',
      usersInRoom: []
    }
  }

  componentDidMount() {
    const {currentRoomId, socket} = this.props;

    if(currentRoomId) {
      this.setState({channel: currentRoomId});
      this.getUsersInRoom(currentRoomId);

      socket.on("all users", users => {
        this.setState({usersInRoom: users});
        console.log("All users: ", users);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {currentRoomId, socket} = this.props;
    if(currentRoomId !== prevProps.currentRoomId) {
      if(this.state.isjoin) {
        leaveCall();
        log('client leaves channel success');
        socket.emit("leave room", this.state.channel);
        this.setState({isjoin: false, usersInRoom: []}, () => {
          this.setState({channel: currentRoomId});
          this.getUsersInRoom(currentRoomId);
        });
      }
      else {
        this.getUsersInRoom(currentRoomId);
      }
    }
  }

  componentWillUnmount() {
    const {socket} = this.props;
    if(this.state.isjoin) {
      leaveCall();
      log('client leaves channel success');
      this.setState({isjoin: false, usersInRoom: []});
      socket.emit("leave room", this.state.channel);
    }
  }

  getUsersInRoom = (roomID) => {
    const {socket} = this.props;
    console.log("Getting users");
    socket.emit("get room", roomID);
  }

  handleClickJoin = (username, avatar) => {
    const {socket, agoraLoadingOn, agoraLoadingOff} = this.props;
    if(!this.state.appid || !this.state.channel) {
      if(!this.state.appid) {
        console.log('No App ID');
      }
      if(!this.state.channel) {
        console.log('No Channel');
      }
      return
    }

    let options = {
      appId: this.state.appid,
      channel: this.state.channel,
      token: this.state.token,
    };

    agoraLoadingOn();

    startBasicCall(options).then(res => {
      this.setState({agoraID: res});
      socket.emit("join room", username, this.state.channel, res, avatar);
      agoraLoadingOff();
    });

    log('join channel success');
    this.setState({isjoin: true});
  }

  handleClickLeave = () => {
    const {socket} = this.props;
    leaveCall();
    log('client leaves channel success');
    socket.emit("leave room", this.state.channel);
    this.setState({isjoin: false, usersInRoom: []}, () => {
      this.getUsersInRoom(this.props.currentRoomId);
    });
  }

  render() {
    const {userData, classes, agoraLoading} = this.props;
    const {usersInRoom, isjoin, agoraID} = this.state;
    return (
      <div>
        <div className={classes.fixedHeight}>
          <Grid container spacing={1} justify="center" alignItems="center" >

          {usersInRoom.length > 0 ? (
            usersInRoom.map(user => {
              if (user.agoraID === agoraID) {
                return (
                  <Grid item container sm={3} lg={2} justify="center" alignItems="center" direction="column">
                    <Grid item>
                      <Avatar style={{width: "120px", height: "120px"}} src={avatarArray[user.avatar]}>
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h5" style={{color: "#ff4760", marginTop: "20px", fontWeight: "700"}} noWrap>
                        {user.username}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              } else {
                return (
                  <Grid item container sm={3} lg={2} justify="center" alignItems="center" direction="column">
                    <Grid item>
                      <Avatar style={{width: "120px", height: "120px"}} src={avatarArray[user.avatar]}>
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h5" style={{color: "#6604ff", marginTop: "20px", fontWeight: "700"}} noWrap>
                        {user.username}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              }
            })
          ) : (
            <Grid item>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                No one in this room
              </Typography>
            </Grid>
          )}
          </Grid>
        </div>

        {
          agoraLoading ? (
            <div style={{marginBottom: "40px"}}>
              <Grid container spacing={5} justify="center">
                <CircularProgress size={100} />
              </Grid>
            </div>
          ) : null
        }

        <Grid justify="center" alignItems="center" container spacing={0}>
          <Grid item align="center" xs={3} lg={2}>
            <IconButton onClick={() => this.handleClickJoin(userData.username, userData.avatar)} aria-label="join">
              <CallIcon style={{ color: isjoin ? "#424242" : "#0f0", fontSize: 50 }} />
            </IconButton>
          </Grid>
          <Grid item align="center" xs={3} lg={2}>
            <IconButton size="large" onClick={this.handleClickLeave} disabled={!isjoin} aria-label="leave">
              <CallEndIcon style={{ color: isjoin ? "#f00" : "#424242", fontSize: 50 }} />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentRoomId: state.room.currentRoomId,
    agoraLoading: state.loading.agoraLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    agoraLoadingOn: () => {
      dispatch(agoraLoadingOn());
    },
    agoraLoadingOff: () => {
      dispatch(agoraLoadingOff());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceRoom);
