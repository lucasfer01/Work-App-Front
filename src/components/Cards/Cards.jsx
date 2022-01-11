import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getJobs, getPosts } from "../../controllers";
import JobCard from "../JobCard/JobCard";
import PostCard from "../PostCard/PostCard";
import styles from "./Cards.module.css";

export default function Cards(profiledata) {
    const dispatch = useDispatch();
    const [jobs, setJobs] = useState([]);
    const [posts, setPosts] = useState([]);
    let location = window.location.pathname;
    let type;
    if (location === "/home") {
        type = "posts";
    } else if (location === "/jobs") {
        type = "jobs";
    }   else if (location.includes("profil/")) {
        type = "profilejobs";
    }
    let data;
    if (type === "jobs") {
        data = jobs;
    } else if (type === "posts") {
        data = posts;
    }   else if (type === "profilejobs") {
        data = profiledata
    }
    console.log(jobs);
    console.log(posts);


    useEffect(() => {
        const getData = async () => {
            try {
                const jobsData = await getJobs();
                const postsData = await getPosts();
                console.log("jobs:", jobsData)
                console.log("posts:", postsData)
                setJobs(jobsData);
                setPosts(postsData);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    if (type === "jobs") {
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
    } else if (type === "posts") {
        return (
            <div className={styles.postsContainer}>
                {
                    data?.map((post) => {
                        return (
                            <PostCard
                                key={post.post_id}
                                id={post.post_id}
                                title={post.post_title}
                                description={post.post_description}
                                photo={post.post_photo}
                                fee={post.post_fee}
                                priority={post.post_priority}
                            />
                        );
                    })
                }
            </div>
        );
    }
    else if (type === "profilejobs") {
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
    }
};