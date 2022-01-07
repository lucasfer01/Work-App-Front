import React, { useEffect, useState } from "react";
import { getJobs } from "../../controllers";
import JobCard from "../JobCard/JobCard";
import styles from "./Jobs.module.css";



export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    console.log(jobs);

    useEffect(() => {
        const getJobsData = async () => {
            try {
                const jobsData = await getJobs();
                console.log("jobs:", jobsData)
                setJobs(jobsData);
            } catch (error) {
                console.log(error);
            }
        };
        getJobsData();
    }, []);

    return (
        <div className={styles.container}>
            {
                jobs?.map((job) => {
                    return (
                        <JobCard
                            key={job.job_id}
                            id={job.job_id}
                            name={job.job_name}
                            description={job.job_description}
                        />
                    );
                })
            }
        </div>
    );
};