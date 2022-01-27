import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/formEmpleador";
import { getJobs } from "../../actions/formJobs";
import JobCard from "../JobCard/JobCard";
import PostCard from "../PostCard/PostCard";
import styles from "./Cards.module.css";
import Feed from "../NewNav/Feed/Feed";

export default function Cards(profiledata) {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const jobs = useSelector(state => state.jobs.allJobs);

    let location = window.location.pathname;
    let type;
    if (location === "/home") {
        type = "posts";
    } else if (location === "/jobs") {
        type = "jobs";
    }   else if (location.includes("profile/")) {
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
    // console.log(jobs);
    // console.log(posts);
    // console.log("data", data)
    
    const storePosts = useSelector(state => state.posts.filterPost);

    //preuba
    /* const pruebaJob = useSelector(state => state);
    console.log('state',pruebaJob); */

    useEffect(()=>{
        const effect = async () => {
            await dispatch(getJobs());
            setPosts(storePosts);
        }

        effect();
    },[dispatch, storePosts]); 


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
            <Feed posts={posts} />
        );
    }

    else if(type === "profilejobs"){
        if(data.profileType === "jobs"){
            return (
            <div className={styles.jobsContainer}>
                {
                    data.profiledata?.map((job) => {
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
        else if(data.profileType === "posts"){
            return (
            <div className={styles.postsContainer}>
                {
                    data.profiledata?.map((post) => {
                        return (
                            <PostCard
                                key={post.post_id}
                                id={post.post_id}
                                title={post.post_title}
                                description={post.post_description}
                                photo={post.post_photo ? post.post_photo[0] : ""}
                                fee={post.post_fee}
                                priority={post.post_priority}
                                authorId={post.usr_id}
                            />
                        );
                    })
                }
            </div>
        );
        }
    }
};