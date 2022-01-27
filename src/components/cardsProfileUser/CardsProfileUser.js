import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JOB_URL } from "../../enviroment";
import { CardProfileUser } from "../cardProfileUser/CardProfileUser";

export const CardsProfileUser = () => {
  const [users, setUsers] = useState([]);
  const [job, setJob] = useState({});

  const { jobId } = useParams();

  useEffect(() => {
    axios
      .get(`${JOB_URL}/${jobId}`)
      .then((res) => {
        setUsers(res.data.users.sort((a,b) => a.usr_relevanceScore - b.usr_relevanceScore).reverse());
        setJob(res.data);
      })
      .catch((error) => console.log(error));
  }, [jobId]);

  console.log('user', users)

  return (
    <div className="container-fluid">
      <div className="row">
        {users.map((userData) => (
          <CardProfileUser
            key={userData.usr_id}
            id={userData.usr_id}
            name={userData.usr_username}
            job={job.job_name}
            desc={userData.usr_description}
            img_url={userData.usr_photo && userData.usr_photo}
          />
        ))}
      </div>
    </div>
  );
};
