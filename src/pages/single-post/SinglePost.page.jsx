import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSinglePost } from "../../service/posts/post.service";

function SinglePost() {
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    getSinglePost(postId)
      .then((post) => {
        setTimeout(() => {
          setSinglePost(post);
        }, 2000);
      })
      .catch((message) => {
        setError(message);
      });
  }, []);

  if (!singlePost) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return <div>Single Post id {postId}</div>;
}

export default SinglePost;
