import React, { useEffect, useState } from "react";
import { getPosts } from "../../service/posts/post.service";
import { Link } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((dbPosts) => {
      setPosts(dbPosts);
    });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Link key={post.id} to={`/post/${post.id}`}>
          <div>
            <img height="100px" src={post.image} />
            <br />
            <p>{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Feed;
