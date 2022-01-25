import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Cancel, Mail, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
// Estilos
import newNavStyles from './Styles/newNav.module.css';
import { useSelector } from 'react-redux'
import { IMG } from '../../enviroment'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.open ? "flex" : "none"),
      width: "70%",
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  icons: {
    cursor: "pointer",
    alignItems: "center",
    display: (props) => (props.open ? "none" : "flex"),
  },
  badge: {
    marginRight: theme.spacing(4),
  },
}));

const NewNav = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });

  const profile = useSelector((state) => state.profile.ownProfile)

  const profileAvatar = () =>{
    window.location.href= `/profile/${profile?.usr_id}` ? `/profile/${profile.usr_id}` : null 
  }

  return (
    <AppBar style={{position:"sticky"}}>
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <Typography variant="h6" className={classes.logoLg}>
            WorkApp
          </Typography>
        </Link>
        <Typography variant="h6" className={classes.logoSm}>
          WORKING
        </Typography>
        <div className={classes.search}>
          <Search />
          <InputBase placeholder="Search..." className={classes.input} />
          <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
        </div>
        <div className={classes.icons}>
          <Search
            className={classes.searchButton}
            onClick={() => setOpen(true)}
          />
          <Badge badgeContent={4} color="secondary" className={classes.badge}>
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="secondary" className={classes.badge}>
            <Notifications />
          </Badge>
          <button onClick={profileAvatar}>
            <Avatar
            alt="Full stack"
            src={profile?.usr_photo? profile.usr_photo : IMG }
            />
            </button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NewNav;