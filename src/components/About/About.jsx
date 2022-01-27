import axios from "axios";
import { CardProfileUser } from "../cardProfileUser/CardProfileUser";
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../enviroment'
import { useEffect } from "react";
import { getUsers } from "../../actions/getUsers";
import Leftbar from "../NewNav/Leftbar/Leftbar";

export const About = () => {
  const dispatch = useDispatch();
  const Allusers = useSelector(state => state.users.allUsers);
  useEffect(() => {
    dispatch(getUsers())
  }, []);
  
const admins = Allusers.filter((u) => u.usr_role === "admin")

    return (
        <div className="container-fluid2">
          <div className="row2" style={{display: "grid", gridTemplateColumns: "17fr 80fr"}}>
            <div style={{width: '100%'}}>
              <Leftbar/>
            </div>
            <div style={{display: "grid",gridTemplateColumns: "repeat(4, 1fr)", marginTop:'5rem'}}>
              {admins?.map((userData) => (
                <CardProfileUser
                  key={userData.usr_id}
                  id={userData.usr_id}
                  name={userData.usr_username}
                  desc={userData.usr_description}
                  img_url={userData.usr_photo && userData.usr_photo}
                  style = {{width: '90%', margin: '10px'}}
                />
                ))}
            </div>
          </div>
        </div>
      );
}
