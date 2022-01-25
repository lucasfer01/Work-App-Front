import { Container, makeStyles } from "@material-ui/core";
import Post from "../Post/Post";
import { useEffect } from "react";
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

  useEffect(() => {
    const getAllposts = async () => {
      await dispatch(getPosts());
    };
    getAllposts();
  }, [dispatch]);
  
  return (
    <Container className={classes.container}>
      <Filtros />
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