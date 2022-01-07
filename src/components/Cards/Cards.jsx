import React from "react";
import JobCard from "../JobCard/JobCard";
import PostCard from "../PostCard/PostCard";
import styles from "./Cards.module.css";

export default function Jobs({type, data}) {
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
};