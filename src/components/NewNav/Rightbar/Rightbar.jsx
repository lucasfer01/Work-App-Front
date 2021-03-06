import {
    Link,
    Container,
    makeStyles,
    Typography,
    Divider,
  } from "@material-ui/core";
  // Url
  import { FRONT_URL, JOB_URL } from "../../../enviroment";
  import axios from 'axios';
import { useState, useEffect } from "react";
  
  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(10),
      position: "sticky",
      top: 0,
    },
    title: {
      fontSize: 16,
      fontWeight: 500,
      color: "#555",
    },
    link: {
      marginRight: theme.spacing(2),
      color: "#555",
      fontSize: 16,
    },
  }));
  
  const Rightbar = () => {
    const classes = useStyles();

    const [jobId, setJobId] = useState({Carpintero: '',Electricista: '',Programador: '', Albañil:'', Mecanico: ''});

    const jobs = ['Carpintero', 'Electricista', 'Programador', 'Albañil', 'Mecanico']

    useEffect(() => {
      const promises = jobs.map(job => axios.get(`${JOB_URL}/job?jobName=${job}`));

      Promise.all(promises)
        .then(response => response.data.map(job => setJobId({...jobId,[job.job_name]:job.job_id})))
        .catch(error => console.log(error));
    },[]);

    console.log(jobId);

    
    return (
      <Container className={classes.container}>
        <Typography className={classes.title} gutterBottom>
          Categorias que puedan servirle
        </Typography>
        
        <Link href={`${FRONT_URL}/job/29`} className={classes.link} variant="body2">
          Carpintero
        </Link>
        <Link href={`${FRONT_URL}/job/29`} className={classes.link} variant="body2">
          Electricista
        </Link>
        <Link href={`${FRONT_URL}/job/63`} className={classes.link} variant="body2">
          Programador
        </Link>
        <Divider flexItem style={{marginBottom:5}}/>
        <Link href={`${FRONT_URL}/job/4`} className={classes.link} variant="body2">
          Albañil
        </Link>
        <Link href={`${FRONT_URL}/job/44`} className={classes.link} variant="body2">
          Mecanico
        </Link>
      </Container>
    );
  };
  
  export default Rightbar;