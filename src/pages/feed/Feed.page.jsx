import React, { useEffect, useState } from "react";
import { getPosts } from "../../service/posts/post.service";
import * as PATHS from "../../utils/paths";
import { Link, Navigate } from "react-router-dom";

function Feed(props) {
  const [posts, setPosts] = useState([]);
  //  do i have access to any post?

  // Hook to manage side effects.
  // Handles the lifecycle of a component
  useEffect(() => {
    getPosts().then((dbPosts) => {
      if (!dbPosts.success) {
        return;
      }
      setPosts(dbPosts.data.posts);
    });
  }, []);

  if (!props.user) {
    // no loggedin user
    return <Navigate to={PATHS.LOGIN_PAGE} replace />;
  }

  return (
    <div>
      {posts.map((post) => (
        <Link key={post.id} to={`/post/${post.id}`}>
          <div>
            <img height="100px" src={post.image} alt={post.content} />
            <br />
            <p>{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Feed;
