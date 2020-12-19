import React, {Component} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logOut } from '../reduxStore/actions/authActions';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../components/materialui/styles';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {isAuthenticated, classes} = this.props;
    return (
      <>
        <Grid className={classes.homeNav} container spacing={0} justify="flex-start" alignItems="center" >
          <Grid item container spacing={0} justify="flex-start" alignItems="center" xs={6} >
            <img className={classes.homeLogo} src="https://res.cloudinary.com/dflkduc49/image/upload/v1607860148/HolaPeepsLogo_yhgwib.png" />
          </Grid>
        </Grid>

        <Grid className={classes.homeRoot} container spacing={0} justify="center" alignItems="center">
          <Grid item lg={1}>
          </Grid>
          <Grid item container spacing={0} justify="center" alignItems="center" direction="column" xs={12} md={5} lg={4}>
            <Typography className={classes.homeHeading} component="h2" variant="h2" align="center">
              Hola Peeps
            </Typography>
            <Typography className={classes.homeSubheading} variant="h5" align="center">
              A Voice Based Social Network
            </Typography>
            {
              isAuthenticated ? (
                <Link component={RouterLink} to="/app">
                  <ButtonBase className={classes.homeMainButton} >
                    <span>Go to the app</span>
                  </ButtonBase>
                </Link>
              ) : (
                <Link component={RouterLink} to="/app">
                  <ButtonBase className={classes.homeMainButton} >
                    <span>Get Started</span>
                  </ButtonBase>
                </Link>
              )
            }

          </Grid>
          <Grid item>
          </Grid>
          <Grid item align="center" xs={12} md={5} lg={6}>
            <img className={classes.homeImage} src="https://res.cloudinary.com/dflkduc49/image/upload/v1607941504/homepage_top_art_ulvwhs.png" />
          </Grid>
          </Grid>
          <Grid item lg={1}>
        </Grid>

        <Grid className={classes.homeBottom} container spacing={0} justify="center" alignItems="center" direction="column">
          <Grid item container spacing={0} justify="center" alignItems="center" xs={10} sm={9} md={6} lg={6}>
            <Typography style={{color: "#6604ff", fontFamily: "Montserrat, sans-serif", fontWeight: "900"}} component="h4" variant="h4" align="center">
              Envision the next big social media phenomenon
            </Typography>
          </Grid>
          <Grid item container spacing={0} justify="center" alignItems="center" xs={11} md={8} lg={8}>
            <Typography className={classes.homeBottomHeading} variant="h5" align="center">
              Texting is boring. Try our spontaneous and exciting voice based social platform. Have fun with your friends!
            </Typography>
          </Grid>
          <Grid item align="center" xs={11} md={8} lg={6}>
            <img style={{width: "100%", maxWidth: "800px"}} src="https://res.cloudinary.com/dflkduc49/image/upload/v1607860149/home_image1_cgi6rc.png" />
          </Grid>
        </Grid>
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
  // console.log(state);
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Home);
