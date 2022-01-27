import React, { useEffect, useState } from "react";
import { getJobs } from "../../controllers";
import JobCard from "../JobCard/JobCard";
import axios from "axios";


export default function Jobs() {
    const [jobs, setJobs] = useState([]);

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
        <div>
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