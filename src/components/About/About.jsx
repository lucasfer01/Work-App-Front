import { CardProfileUser } from "../cardProfileUser/CardProfileUser";

export const About = () => {

    const users = [
        {
            usr_id: "",
            usr_username: "",
            usr_description: "",
            usr_photo: ""
        }
    ]


    return (
        <div className="container-fluid">
          <div className="row">
            {users.map((userData) => (
              <CardProfileUser
                key={userData.usr_id}
                id={userData.usr_id}
                name={userData.usr_username}
                desc={userData.usr_description}
                img_url={userData.usr_photo && userData.usr_photo}
              />
            ))}
          </div>
        </div>
      );
}
