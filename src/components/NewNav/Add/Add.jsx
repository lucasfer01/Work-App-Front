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
import { Add as AddIcon } from "@material-ui/icons";
import { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { postPost, getPosts } from '../../../actions/formEmpleador';
import { sendEmail } from "../../../controllers";
import { startUploading } from "../../../helpers/imageUpload";
import { useSelector, useDispatch } from "react-redux";
// import Boton from '../Boton/Boton';
import { useNavigate } from 'react-router-dom';
import React from "react";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    width: 500,
    height: 700,
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
    background: "transparent",
    color: "gray",
  },
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
      const createPost = await postPost({
        post: {...post, post_photo: post.post_photo.length ? post.post_photo : ['https://www.trecebits.com/wp-content/uploads/2017/07/empleo-trabajo.jpg']},
        jobs: postJobs,
      });

      const email = await sendEmail(postJobs);
     
      setOpen(false);

      alert("Post created succesufully")

      await dispatch(getPosts())
       
    } catch (e) {
      alert(e);
    }
  }

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }

  const handleAddPhoto = async (e) => {
    e.preventDefault();

    const urlFoto = await startUploading(file);

    setPost({
      ...post,
      post_photo: [...post.post_photo, urlFoto]
    })
    setFile("");
  }

  const handleDeletePhoto = (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.log("photo:", value);
    setPost({
      ...post,
      post_photo: post.post_photo.filter(p => p !== value)
    })
  }

  const handleJobChange = (e) => {
    const { value } = e.target;;
    setNewJob(value);
    const filteredJobs = jobs.filter(job => job.job_name.toLowerCase().includes(value.toLowerCase()));
    setJobList(filteredJobs);
  }

  const handleAddJob = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setPostJobs([...postJobs, value]);
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
    <>
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
                size="small"
                style={{ width: "100%" }}
                value={newJob}
                onChange={handleJobChange}
              />
            </div>
            {
              jobList.map(job => (
                <div key={job.job_id}>
                  <input className={classes.trabajos} type="button" value={job.job_name} onClick={handleAddJob} />
                </div>
              ))
            }
            {
              postJobs.map((job, index) => {
                return (
                  <div className='formEmpleado_job' key={index}>
                    <p>{job}</p>
                    <button type="button" onClick={handleDeleteJob} value={job}>Eliminar</button>
                  </div>
                )
              })
            }
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Tituto del trabajo"
                size="small"
                style={{ width: "100%" }}
                onChange={event => setPost({ ...post, post_title: event.target.value })}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                placeholder="Una breve descripción del trabajo..."
                variant="outlined"
                label="Resumen del trabajo"
                size="small"
                style={{ width: "100%" }}
                value={post.post_shortdescription} onChange={(event) => setPost({ ...post, post_shortdescription: event.target.value })}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Que estoy necesitando..."
                variant="outlined"
                label="Description"
                size="small"
                style={{ width: "100%" }}
                value={post.post_description} onChange={(event) => setPost({ ...post, post_description: event.target.value })}
              />
            </div>
            <div className={classes.item}>
              <FormLabel component="legend" onChange={(event) => setPost({ ...post, post_priority: event.target.value })}>
                En que estado quiere su post?</FormLabel>
              <RadioGroup onClick={handlePriority}>
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
              {
                post.post_photo.length > 0 && post.post_photo.map((photo, i) => {
                  return (
                    <div key={i} className="boxfoto">
                      <input type="image" src={photo} alt="img not found" />
                      <button value={photo} onClick={handleDeletePhoto}>X</button>
                    </div>
                  )
                })
              }
            </div>
            <div className={classes.item}>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 20 }}
                onClick={handleOnSubmit}
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
    </>
  );
};

export default Add;