import React from "react";
import {Link} from "react-router-dom";
import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    makeStyles,
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
      marginBottom: "-11px",
      marginTop: "13%",
      display: "inline-flex",
      width: "30%",
      marginLeft: "20px",
    },
    media: {
      height: 250,
      [theme.breakpoints.down("sm")]: {
        height: 150,
      },
    },
  }));

export default function JobCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
              <CardActionArea>
              <CardMedia className={classes.media} image={props.photo} 
              title="My Post" />
              <Link to={`/job/${props.id}`}>
              <Typography gutterBottom variant="h5">
                  {props.name}
                  </Typography>
            </Link>
            </CardActionArea>
        </Card>
    );
};
