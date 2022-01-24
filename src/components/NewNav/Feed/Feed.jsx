import { Container, makeStyles } from "@material-ui/core";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = ({profilePosts}) => {
  const classes = useStyles();
  const allPosts = useSelector((state) => state.posts.filterPost);
  let posts = profilePosts ? profilePosts : allPosts;
  console.log("feedposts", posts);
  return (
    <Container className={classes.container}>
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