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
import { Link, useNavigate } from "react-router-dom";
// Estilos
import newNavStyles from './Styles/newNav.module.css';
import { IMG } from '../../enviroment'
import { SearchBar } from "../SearchBar/SearchBar";
import ChatWindowv2 from "../ChatWindow/ChatWindowv2";
import socket from "../socket";
import Notification from "../Messenger/Notification/Notification";
import Leftbar from "./Leftbar/Leftbar";
import { ImList } from "react-icons/im";

const useStyles = makeStyles((theme) => ({
  divnav: {
    position: "fixed",
    top: "0",
    zIndex: 5,
    height: "65px",
  },
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
  campana: {
    color: "white",
  },
  badge: {
    marginRight: theme.spacing(4),
  },
  leftbar: {
    display: "flex",
    width: "12vw",
    position: "fixed",
    zIndex: 3,
  },

}));

const NewNav = () => {
  const [open, setOpen] = useState(false);
  const [displayNotifications, setDisplayNotifications] = useState(false);
  const classes = useStyles({ open });
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.auth.uid);
  const [notifications, setNotifications] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const naviagte = useNavigate();
  const [mess, setMess] = useState({
    badgeContent: unreadMessages.length ? "!" : "",
    badgeColor: "transparent",
  });
  const [not, setNot] = useState({
    badgeContent: notifications.length ? "!" : "",
    badgeColor: notifications.length ? "secondary" : "transparent",
  });

  const [showLeftBar, setShowLeftBar] = useState(false);


  useEffect(() => {
    const getData = async () => {
      await dispatch(profileUser(myId, "own"));
      await dispatch(getJobs());
    };
    getData();
  }, [myId, dispatch]);

  useEffect(() => {
    socket.emit("register", myId);
    socket.on("unread-messages", (data) => {
      if (data?.length) {
        setUnreadMessages([...unreadMessages, data]);
        setMess({
          badgeContent: "!",
          badgeColor: "secondary",
        });
      }
    })
    socket.on("unread-notifications", (data) => {
      setNotifications(data);
      setNot({
        badgeContent: data.length ? "!" : "",
        badgeColor: data.length ? "secondary" : "transparent",
      });
    })
    socket.on("new-post", async (data) => {
      const res = await data;
      setNotifications([...notifications, res]);
      setNot({
        badgeContent: "!",
        badgeColor: "secondary",
      });
    });
    socket.on("response", (data) => {
      setUnreadMessages([
        ...unreadMessages,
        data.sender
      ])
      setMess({
        badgeContent: "!",
        badgeColor: "secondary",
      });
    })
    return () => {
      socket.emit("unregister", myId);
    };
  }, [myId]);


  const profile = useSelector((state) => state.profile.ownProfile)

  const profileAvatar = () => {
    //window.location.href= `/profile/${profile?.usr_id}` ? `/profile/${profile.usr_id}` : null 
    naviagte(`/profile/${profile?.usr_id}`)
  }

  const handleDisplayNotifications = (e) => {
    e.preventDefault();
    setDisplayNotifications(!displayNotifications);
    setUnreadNotifications([]);
    setNot({
      badgeContent: "",
      badgeColor: "transparent",
    });
    socket.emit("read-notifications", { myId, postId: e.target.value });
    socket.emit("unregister", myId);
    socket.emit("register", myId);
  }

  const handleUnreadMessages = (e) => {
    e.preventDefault();
    console.log("unreadmessages", unreadMessages);
    setMess({
      badgeContent: "",
      badgeColor: "transparent",
    });
  }


  const handleReadNotifications = (e) => {
    e.preventDefault();
    setUnreadNotifications([]);
    setNot({
      badgeContent: "",
      badgeColor: "transparent",
    });
    socket.emit("read-notifications", { myId, postId: e.target.value });
    socket.emit("unregister", myId);
    socket.emit("register", myId);
    setDisplayNotifications(false);
  }

  const handleLeftBar = (e) => {
    e.preventDefault();
    setShowLeftBar(!showLeftBar);
  }

  return (
    <div >
      <AppBar className={classes.divnav}>
        <Toolbar className={classes.toolbar}>
          <Leftbar isOpen={showLeftBar} />
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
            <button onClick={handleUnreadMessages}>
              <Badge badgeContent={mess.badgeContent} color={mess.badgeColor} className={classes.badge}>
                <ChatWindowv2 unreadMessages={unreadMessages} />
              </Badge>
            </button>
            <button onClick={handleDisplayNotifications}>
              <Badge badgeContent={not.badgeContent} color={not.badgeColor} className={classes.badge}>
                <Notifications className={classes.campana} />
              </Badge>
            </button>
            <button onClick={profileAvatar}>
              <Avatar
                alt="Full stack"
                src={profile?.usr_photo ? profile.usr_photo : IMG}
              />
            </button>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ height: "65px" }}>
      </div>
      {
        displayNotifications && (
          notifications?.length > 0 ? notifications.map(notif => {
            return (
              <div className={newNavStyles.notbox}>
                <Notification
                  key={notif?.id}
                  post={notif?.post}
                  jobs={notif?.jobs}
                />
                <button value={notif?.post.post_id} onClick={handleReadNotifications}>Le??da</button>
              </div>
            )
          }) : <div className={newNavStyles.notbox}>A??n no tienes notificaciones</div>
        )
      }
    </div>
  );
};

export default NewNav;