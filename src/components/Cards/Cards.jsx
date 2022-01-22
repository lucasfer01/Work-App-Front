import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/formEmpleador";
import { getJobs } from "../../actions/formJobs";
import JobCard from "../JobCard/JobCard";
import PostCard from "../PostCard/PostCard";
import styles from "./Cards.module.css";
import Feed from "../NewNav/Feed/Feed";

export default function Cards({profileJobs}) {
    const jobs = useSelector(state => state.jobs.allJobs)
    let location = window.location.pathname;
    let data = profileJobs ? profileJobs : jobs;
    return (
        <div className={styles.jobsContainer}>
            {
                data?.map((job) => {
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