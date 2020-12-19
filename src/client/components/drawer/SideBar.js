import React, {Component} from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { avatarArray } from '../../utils/avatarImgLinks';

class Sidebar extends Component{

  constructor(props) {
    super(props);
    this.state = {
      friendsOpen: true,
      requestsOpen: true,
      pendingOpen: true
    };
  }

  handleFriendsClose = () => {
    this.setState(prevState => {
      return {friendsOpen: !prevState.friendsOpen}
    });
  }

  handleRequestsClose = () => {
    this.setState(prevState => {
      return {requestsOpen: !prevState.requestsOpen}
    });
  }

  handlePendingClose = () => {
    this.setState(prevState => {
      return {pendingOpen: !prevState.pendingOpen}
    });
  }

  render() {
    const {classes, open, handleDrawerClose, handleRoomChange, handleAccept, handleReject, userData, friends, requests, pending, currentRoomId} = this.props;
    const {friendsOpen, requestsOpen, pendingOpen} = this.state;
    return (
      <>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon style={{ color: "#6604ff", fontSize: "40px" }} />
            </IconButton>
          </div>
          <Paper>
            <Grid style={{height: open ? "360px" : "50px", backgroundColor: "#fff"}} container justify="center" alignItems="center" direction="column">
              <Grid item>
                <Avatar style={{width: open ? "175px" : "30px", height: open ? "175px" : "30px", backgroundColor: "#fff2f2"}} src={avatarArray[userData.avatar]}>
                </Avatar>
              </Grid>
              {
                open ? (
                  <Grid item>
                    <Typography component="h5" variant="h4" style={{color: "#6604ff", marginTop: "20px", marginBottom: "60px", fontWeight: "700"}} noWrap>
                      {userData.username}
                    </Typography>
                  </Grid>
                ) : null
              }
            </Grid>
          </Paper>

          <List>
            <div>
              {
                userData.roomId === currentRoomId ? (
                  <ListItem button style={{backgroundColor: "#de354c", color: "#fff"}} selected onClick={() => handleRoomChange(userData.roomId)}>
                    <ListItemIcon>
                      <HomeIcon style={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography style={{fontSize: "22px", fontWeight: "500"}}>Your room</Typography>} disableTypography />
                  </ListItem>
                ) : (
                  <ListItem button onClick={() => handleRoomChange(userData.roomId)}>
                    <ListItemIcon>
                      <HomeIcon style={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography style={{fontSize: "22px", fontWeight: "500"}}>Your room</Typography>} disableTypography />
                  </ListItem>
                )
              }
              <Divider />
              <ListItem button onClick={this.handleFriendsClose}>
                <ListItemIcon>
                  <PeopleIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{fontSize: "22px", fontWeight: "500"}}>Friends</Typography>} disableTypography />
                {friendsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={friendsOpen} timeout="auto">
                <List component="div" disablePadding>
                  {friends.length > 0 ? friends.map(user => {
                    return (<ListItem
                      style={{backgroundColor: user.roomId === currentRoomId ? "#de354c" : "#6604ff", color: "#fff" }}
                      selected key={user._id}
                      button
                      onClick={() => handleRoomChange(user.roomId)}>
                      <ListItemIcon>
                        <Badge invisible={!user.isOnline} badgeContent=" " variant="dot">
                          <Avatar style={{ backgroundColor: "#fff"}} src={avatarArray[user.avatar]}>
                          </Avatar>
                        </Badge>
                      </ListItemIcon>
                      <ListItemText primary={<Typography style={{fontSize: "22px", fontWeight: "500"}}>{user.username}</Typography>} disableTypography />
                    </ListItem>)

                  }) : null}
                </List>
              </Collapse>

              <Divider />
              <ListItem button onClick={this.handleRequestsClose}>
                <ListItemIcon>
                  <EmojiPeopleIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{fontSize: "22px", fontWeight: "500"}}>Requests</Typography>} disableTypography />
                {requestsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={requestsOpen} timeout="auto">
                <List component="div" disablePadding>
                  {requests.length > 0 ? requests.map(user => {
                    return (<ListItem key={user._id} button>
                      <ListItemIcon>
                        <Avatar style={{ backgroundColor: "#fff"}} src={avatarArray[user.avatar]}>
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={<Typography style={{fontSize: "22px", fontWeight: "500"}}>{user.username}</Typography>} disableTypography />
                      <IconButton onClick={() => handleAccept(user._id, userData._id, user)} edge="end" aria-label="accept">
                        <PersonAddIcon />
                      </IconButton>
                      <IconButton onClick={() => handleReject(user._id, userData._id, user)} edge="end" aria-label="reject">
                        <DeleteForeverIcon />
                      </IconButton>
                    </ListItem>)
                  }) : null}
                </List>
              </Collapse>

              <Divider />
              <ListItem button onClick={this.handlePendingClose}>
                <ListItemIcon>
                  <HourglassFullIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography style={{fontSize: "22px", fontWeight: "500"}}>Pending</Typography>} disableTypography />
                {pendingOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={pendingOpen} timeout="auto">
                <List component="div" disablePadding>
                  {pending.length > 0 ? pending.map(user => {
                    return (<ListItem key={user._id} button>
                      <ListItemIcon>
                        <Avatar style={{ backgroundColor: "#fff"}} src={avatarArray[user.avatar]}>
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={<Typography style={{fontSize: "22px", fontWeight: "500"}}>{user.username}</Typography>} disableTypography />
                    </ListItem>)
                  }) : null}
                </List>
              </Collapse>

            </div>
          </List>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData
  }
}

export default connect(mapStateToProps)(Sidebar);
