import React, { useEffect, useState } from "react";
import { getJobs } from "../../controllers";
import JobCard from "../JobCard/JobCard";
import axios from "axios";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    jobscontainer: {
        width: "65vw",
    }
  }));

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const getJobsData = async () => {
            try {
                const jobsData = await getJobs();
                setJobs(jobsData);
            } catch (error) {
                console.log(error);
            }
        };
        getJobsData();
    }, []);

    return (
        <div className={classes.jobscontainer}>
            {
                jobs.map((job) => {
                    return (
                        <JobCard
                            key={job.job_id}
                            id={job.job_id}
                            name={job.job_name}
                            description={job.job_description}
                            photo={job.job_photo}
                        />
                    );
                })
            }
        </div>
    );
};