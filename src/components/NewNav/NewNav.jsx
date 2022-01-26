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
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getJobs } from "../../actions/formJobs";
import { profileUser } from "../../actions/profileActions";
import { Link } from "react-router-dom";
// Estilos
import newNavStyles from './Styles/newNav.module.css';
import { IMG } from '../../enviroment'
import { SearchBar } from "../SearchBar/SearchBar";
import ChatWindow from "../ChatWindow/ChatWindow";
import socket from "../socket";
import Notification from "../Messenger/Notification/Notification";

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
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.auth.uid);
  const [notifications, setNotifications] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  console.log("unreadmess", unreadMessages);
  console.log("unreadnot", unreadNotifications);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getJobs());
      await dispatch(profileUser(myId, "own"));
    };
    getData();
  }, [myId, dispatch]);

  useEffect(() => {
    socket.emit("register", myId);
    socket.on("unread-messages", (data) => {
      setUnreadMessages(data);
      console.log("unreadmess1", unreadMessages);
    })
    socket.on("unread-notifications", (data) => {
      setUnreadNotifications(data);
      console.log("unreadnot1", unreadNotifications);
    })
    socket.on("new-post", async (data) => {
      const res = await data;
      setNotifications([...notifications, res]);
    });

    return () => {
      socket.emit("unregister", myId);
    };
  }, [myId, notifications]);


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
          <SearchBar />
          {/* <InputBase placeholder="Search..." className={classes.input} /> */}
          <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
        </div>
        <div className={classes.icons}>
          <Search
            className={classes.searchButton}
            onClick={() => setOpen(true)}
          />
           <ChatWindow />
          <Badge badgeContent={4} color="secondary" className={classes.badge}>
            {/* <Mail /> */}
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