import React, { useEffect, useState } from "react";
import { getPosts } from "../../service/posts/post.service";
import { Link } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);
  //  do i have access to any post?

  // Hook to manage side effects.
  // Handles the lifecycle of a component
  useEffect(() => {
    getPosts().then((dbPosts) => {
      console.log("dbPosts:", dbPosts);
      setPosts(dbPosts.data.posts);
    });
  }, []);

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
