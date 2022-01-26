import { Container, makeStyles } from "@material-ui/core";
import Post from "../Post/Post";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filtros from "../../Filtros/Filtros";
import { getPosts } from "../../../actions/formEmpleador";


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = ({profilePosts}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.filterPost);
  const posts = profilePosts ? profilePosts : allPosts;

  // Mostrar filtro
  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    // Comprobamos si pathname empieza con profile
    if(window.location.pathname.slice(1,8) === 'profile') {
      // Seteamos el estado en false
      setShowFilter(false);
    }

    const getAllposts = async () => {
      await dispatch(getPosts());
    };
    getAllposts();
  }, [dispatch]);
  
  return (
    <Container className={classes.container}>
      {showFilter && <Filtros />}
      {
        posts?.map((post) => (
          <Post
            key={post.post_id}
            id={post.post_id}
            title={post.post_title}
            description={post.post_description}
            shortdescription={post.post_shortdescription}
            photo={post.post_photo}
            authorId={post.usr_id}
            priority={post.post_priority}
          />
        ))
      }
    </Container>
  );
};

export default Feed;