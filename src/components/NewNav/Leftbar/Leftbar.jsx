import { Container, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  ExitToApp,
  Work,
  Home,
  Person,
  Face,
  ArrowUpward 
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../../actions/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  parr: {
    fontWeight: 500,
    marginLeft: "29px",
    marginTop: "-23px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Leftbar = () => {
  const { uid } = useSelector((state) => state.auth)

  const classes = useStyles();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Link to="/home">
          <Home className={classes.icon} />
          <Typography className={classes.text}><p className={classes.parr}>Home</p>
          </Typography>
        </Link>
      </div>
      <div className={classes.item}>
        <Link to="/jobs">
          <Work className={classes.icon} />
          <Typography className={classes.text}><p className={classes.parr}>Buscar Trabajo</p>
          </Typography>
        </Link>
      </div>
      <div className={classes.item}>
        <Link to={`/profile/${uid}`}>
          <Person className={classes.icon} />
          <Typography className={classes.text}><p className={classes.parr}>Perfil</p>
          </Typography>
        </Link>
      </div>
      <div className={classes.item}>
        <Link to="/about">
          <Face className={classes.icon} />
          <Typography className={classes.text}><p className={classes.parr}>Nosotros</p>
          </Typography>
        </Link>
      </div>
      <div className={classes.item}>
        <Link to={`/upgradePlan`}>
          <ArrowUpward className={classes.icon} />
          <Typography className={classes.text}><p className={classes.parr}>Mejorar Plan</p>
          </Typography>
        </Link>
      </div>
      <div className={classes.item}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text} onClick={handleLogout}>Logout</Typography>
      </div>
    </Container>
  );
};

export default Leftbar;