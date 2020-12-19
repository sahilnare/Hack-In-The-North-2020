import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles';

export const drawerWidth = 420;
export const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    padding: "20px 24px 20px 40px",
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: "#de354c",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px"
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '20px 8px',
    backgroundColor: "#fff",
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    // flexGrow: 1,
    fontWeight: 800,
    marginRight: 200,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: "#6604ff",
    color: "#fff",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: {
    minHeight: 96,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    minHeight: 500,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  inputRoot: {
    color: "#fff",
    ".MuiAutocomplete-inputRoot": {
      color: "#fff",
    },
    "&:placeholder .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      color: "#fff",
      borderColor: "white",
      borderRadius: "20px",
      borderWidth: "2px"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      color: "#fff",
      borderColor: "white",
      borderRadius: "20px",
      borderWidth: "2px"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      color: "#fff",
      borderColor: "white",
      borderRadius: "20px",
      borderWidth: "2px"
    }
  },
  buttonMargin: {
    marginRight: 36
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  onlineUser: {
    color: theme.palette.success.main,
  },
  formRoot: {
    height: '100vh',
  },
  formPaper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  homeRoot: {
    background: "url(https://res.cloudinary.com/dflkduc49/image/upload/v1607860148/wave1_q9joyp.png), url(https://res.cloudinary.com/dflkduc49/image/upload/v1607860148/wave2_ugnaot.png)",
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "-160px 30px, -40px 0px",
    padding: "70px 10px 40px",
    [theme.breakpoints.down('md')]: {
      padding: '120px 10px 50px',
      backgroundPosition: "-240px 30px, -120px 0px",
    },
    [theme.breakpoints.down('sm')]: {
      padding: '230px 10px 50px',
      backgroundPosition: "-240px 30px, -120px 0px",
    },
    [theme.breakpoints.down('xs')]: {
      padding: '140px 10px 20px',
      backgroundPosition: "0px 40px, -160px -40px",
    }
  },
  homeImage: {
    padding: "0px",
    width: "100%",
    maxWidth: "650px",
    [theme.breakpoints.down('sm')]: {
      padding: '0px 20px',
      maxWidth: "500px",
    },
  },
  homeHeading: {
    marginTop: "45px",
    color: "#6604ff",
    fontFamily: "Bangers, cursive",
    fontSize: "80px"
  },
  homeSubheading: {
    color: "#ff4760",
    marginBottom: "40px",
    fontWeight: "800",
    fontSize: "25px"
  },
  homeMainButton: {
    color: "#fff",
    backgroundColor: "#6604ff",
    borderRadius: "25px",
    height: "55px",
    width: "200px",
    fontSize: "24px",
    marginBottom: "50px",
    textDecoration: "none",
    WebkitTextDecoration: "none"
  },
  homeBottom: {
    background: "url(https://res.cloudinary.com/dflkduc49/image/upload/v1607941512/pink_wave_pof5lz.png)",
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "0px 0px",
    padding: "320px 10px 80px",
    [theme.breakpoints.down('md')]: {
      padding: '280px 10px 80px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '250px 10px 80px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '180px 10px 80px',
    }
  },
  homeBottomHeading: {
    color: "#ff4760",
    margin: "30px 0 20px",
    fontWeight: "700",
    fontSize: "22px"
  },
  homeInviteButton: {
    color: "#fff",
    backgroundColor: "#6604ff",
    borderRadius: "23px",
    height: "46px",
    width: "150px",
    fontSize: "20px",
    textDecoration: "none",
    WebkitTextDecoration: "none"
  },
  homeNav: {
    padding: "20px 60px",
    [theme.breakpoints.down('sm')]: {
      padding: '10px 30px',
    }
  },
  homeLogo: {
    maxWidth: "70px",
    [theme.breakpoints.down('xs')]: {
      maxWidth: "50px",
    }
  },
  homeFoot: {
    padding: "40px 120px",
    [theme.breakpoints.down('sm')]: {
      padding: '20px 30px',
    }
  },
  homeFootLeft: {
    color: "#6604ff",
    fontFamily: "Bangers, cursive",
    fontSize: "50px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "40px"
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "30px"
    }
  },
  homeFootRight: {
    fontSize: "40px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "30px"
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "30px"
    }
  },
});
