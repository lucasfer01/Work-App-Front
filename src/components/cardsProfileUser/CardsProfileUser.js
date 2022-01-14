import React from "react";
import { CardProfileUser } from "../cardProfileUser/CardProfileUser";

export const CardsProfileUser = () => {
  const usersData = [
    {
      id: 1,
      name: "Juan Garcia",
      job: "Carpintero",
      desc: `Lorem, ipsum dolor sit amet consecteturadipisicing elit. 
      Possimus recusandae voluptas quis, quisquaminventore praesentium natus magnam rerum consequuntur temporelaudantium amet!`,
      rating: 2.8,
      img_url:
        "https://www.elsoldemazatlan.com.mx/local/ipdbj7-carpintero.jpg/ALTERNATES/FREE_768/carpintero.jpg",
    },
    {
      id: 2,
      name: "Pedro Marquez",
      job: "Herrero",
      desc: `Lorem, ipsum dolor sit amet consecteturadipisicing elit. 
        Possimus recusandae voluptas quis, quisquaminventore praesentium natus magnam rerum consequuntur temporelaudantium amet!`,
      rating: 4.2,
      img_url:
        "https://ep01.epimg.net/economia/imagenes/2019/12/23/nuevos_tiempos/1577091901_488313_1577106270_noticia_normal.jpg",
    },
    {
      id: 3,
      name: "Carlos Valdez",
      job: "Plomero",
      desc: `Lorem, ipsum dolor sit amet consecteturadipisicing elit. 
        Possimus recusandae voluptas quis, quisquaminventore praesentium natus magnam rerum consequuntur temporelaudantium amet!`,
      rating: 3.3,
      img_url:
        "https://images.homify.com/images/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1569517057/p/photo/image/3211361/a_durban_plumber_fixing_a_pipe/fotos-de-ba-os-de-estilo-clasico-de-the-durban-pro-plumber-group.jpg",
    },
    {
      id: 4,
      name: "Sheyla Cortez",
      job: "Maestra de Idiomas",
      desc: `Lorem, ipsum dolor sit amet consecteturadipisicing elit. 
        Possimus recusandae voluptas quis, quisquaminventore praesentium natus magnam rerum consequuntur temporelaudantium amet!`,
      rating: 4.94,
      img_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Ypk3boChZPJSHWanGR7QY9MNbq6vDCQJZQ&usqp=CAU",
    },
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        {usersData.map((userData) => (
          <CardProfileUser key={userData.id} {...userData} />
        ))}
      </div>
    </div>
  );
};
