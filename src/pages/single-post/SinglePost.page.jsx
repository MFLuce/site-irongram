import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSinglePost } from "../../service/posts/post.service";

function SinglePost() {
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSinglePost(postId)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }
        setSinglePost(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Single Post id {singlePost.id}</div>;
}

export default SinglePost;
