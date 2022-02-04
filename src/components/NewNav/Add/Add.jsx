import {
  Button,
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  makeStyles,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Add as AddIcon, NoEncryption } from "@material-ui/icons";
import { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { postPost, getPosts } from '../../../actions/formEmpleador';
import { sendEmail } from "../../../controllers";
import { startUploading } from "../../../helpers/imageUpload";
import { useSelector, useDispatch } from "react-redux";
// import Boton from '../Boton/Boton';
import { useNavigate } from 'react-router-dom';
import React from "react";
import socket from "../../socket";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    width: "35vw",
    height: "80vh",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
    overflowY: "scroll",
  },
  form: {
    padding: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  item: {
    marginBottom: theme.spacing(3),
  },
  trabajos: {
    width: "100%",
    textAlign: "start",
    backgroundColor: "#d8f3dc",
    color: "#495057",
    border: "none",
    "&:hover": {
      backgroundColor: "#ced4da",
    }
  },
  jobsBox: {
    position: "absolute",
    top: "8vh",
    width: "28vw",
    zIndex: 2,
    backgroundColor: "white",
  },
  addedBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  added: {
    display: "flex",
    gap: "10px",
    backgroundColor: "#d8f3dc",
    padding: "4px",
    borderRadius: "0.5vw",
  },
  radios: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  photocontainer: {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto",
    marginTop: "10px",
    marginBottom: "15px",
  },
  photobox: {
    display: "flex",
    flexDirection: "row",
    width: "5em",
    height: "4em",
    border: "1px solid #ccc",
    borderRadius: "3px",
    backgroundColor: "#d8f3dc",
  },
  photo: {
    width: "4em",
    maxHeight: "100%",
  },
  xbtn: {
    position: "relative",
    top: "0",
    height: "25px",
    width: "20px",
    marginLeft: "5px",
    borderRadius: "5px",
    color: "red",
  },
  textField: {
    width: "28vw",
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Add = () => {
  const classes = useStyles();
  let { uid } = useSelector((state) => state.auth)
  const jobs = useSelector((state) => state.jobs.allJobs)
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [post, setPost] = React.useState({
    post_description: "",
    post_shortdescription: "",
    post_photo: [],
    post_title: '',
    post_type: "contratar",
    post_priority: "",
    usr_id: uid
  });
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [file, setFile] = React.useState("");
  const [newJob, setNewJob] = React.useState("");
  const [postJobs, setPostJobs] = React.useState([]);
  const [jobList, setJobList] = React.useState([]);



  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const newPost = {
        post: { ...post, post_photo: post.post_photo.length ? post.post_photo : ['https://www.trecebits.com/wp-content/uploads/2017/07/empleo-trabajo.jpg'] },
        jobs: postJobs,
      }
      const createPost = await postPost(newPost);

      const toSend = {
        post: createPost,
        jobs: postJobs,
      }

      console.log("toSend", toSend)

      const email = await sendEmail(toSend);

      socket.emit("new-post", toSend);

      setOpen(false);

      await dispatch(getPosts())

      alert("Post created succesufully")

    } catch (e) {
      alert(e);
    }
  }

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    console.log("file", file)
    setFile(file);
  }

  const handleAddPhoto = async (e) => {
    e.preventDefault();

    if (post.post_photo.length < 4) {
      const urlFoto = await startUploading(file);
      if (!post.post_photo.includes(urlFoto)) {
        setPost({
          ...post,
          post_photo: [...post.post_photo, urlFoto]
        })
      }
    }
    setFile("");
  }

  const handleDeletePhoto = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setPost({
      ...post,
      post_photo: post.post_photo.filter(p => p !== value)
    })
  }

  const handleJobChange = (e) => {
    const { value } = e.target;;
    setNewJob(value);
    let filteredJobs = [];
    if (value !== "") {
      filteredJobs = jobs.filter(job => job.job_name.toLowerCase().includes(value.toLowerCase()));
    }
    setJobList(filteredJobs);
  }

  const handleAddJob = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (!postJobs.includes(value) && postJobs.length < 3) {
      setPostJobs([...postJobs, value]);
    }
    setNewJob("");
    setJobList([]);
  }

  const handleDeleteJob = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setPostJobs(postJobs.filter(p => p !== value));
  }

  const handlePriority = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setPost({
      ...post,
      post_priority: value
    })
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <div>
      <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open}>
        <Container className={classes.container}>
          <form className={classes.form} autoComplete="off">
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Rubro del trabajo "
                className={classes.textField}
                size="small"
                value={newJob}
                onChange={handleJobChange}
              />
            </div>
            <div className={classes.jobsBox}>
              {
                jobList.slice(0, 8).map(job => (
                  <input key={job.job_id} className={classes.trabajos} type="button" value={job.job_name} onClick={handleAddJob} />
                ))
              }
            </div>
            <div className={classes.addedBox}>
              {
                postJobs.map((job, index) => {
                  return (
                    <div className={classes.added} key={index}>
                      <span>{job}</span>
                      <button type="button" onClick={handleDeleteJob} value={job}>X</button>
                    </div>
                  )
                })
              }
            </div>
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Tituto del trabajo"
                size="small"
                className={classes.textField}
                onChange={event => setPost({ ...post, post_title: event.target.value })}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Resumen del trabajo"
                size="small"
                className={classes.textField}
                value={post.post_shortdescription} onChange={(event) => setPost({ ...post, post_shortdescription: event.target.value })}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                label="Description"
                size="small"
                className={classes.textField}
                value={post.post_description} onChange={(event) => setPost({ ...post, post_description: event.target.value })}
              />
            </div>
            <div className={classes.item}>
              <FormLabel component="legend" onChange={(event) => setPost({ ...post, post_priority: event.target.value })}>
                ¿Con qué urgencia necesita del servicio?</FormLabel>
              <RadioGroup className={classes.radios} onClick={handlePriority}>
                <FormControlLabel
                  value="Urgente"
                  control={<Radio size="small" />}
                  label="Urgente"
                />
                <FormControlLabel
                  value="Poco Urgente"
                  control={<Radio size="small" />}
                  label="Poco Urgente"
                />
                <FormControlLabel
                  value="Sin Urgencia"
                  control={<Radio size="small" />}
                  label="Sin Urgencia"
                />
              </RadioGroup>
            </div>
            <div className={classes.root}>
              <label htmlFor="icon-button-file">
                <input accept="image/*" id="icon-button-file" type="file"
                  onChange={handleChangePhoto} />
                <button onClick={handleAddPhoto}>Añadir</button>
              </label>
              <div className={classes.photocontainer}>
                {
                  post.post_photo.length > 0 && post.post_photo.map((photo, i) => {
                    return (
                      <div key={i} className={classes.photobox}>
                        <img className={classes.photo} src={photo} alt="img not found" />
                        <button className={classes.xbtn} value={photo} onClick={handleDeletePhoto}>X</button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className={classes.item}>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 20 }}
                onClick={handleOnSubmit}
                disabled={postJobs.length < 1 || post.post_title === "" || post.post_shortdescription === "" || post.post_description === "" || post.post_priority === ""}
              >
                Create
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Add;