import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSinglePost } from "../../service/posts/post.service";
import styles from "./SinglePost.module.css";

function SinglePost() {
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState(undefined);
  console.log("singlePost:", singlePost);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSinglePost(postId)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }
        setSinglePost(response.data.post);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className={styles.title}>Post</h1>
      <Link to={`/${singlePost.owner.username}`}>
        <h1>{singlePost.owner.username}</h1>
      </Link>

      <main>
        <img
          width="500"
          src={singlePost.image}
          alt={`${singlePost.owner.username} pic`}
        />
      </main>
      <section>
        {singlePost.content && (
          <div>
            <strong>{singlePost.owner.username}</strong>: {singlePost.content}
          </div>
        )}
      </section>
    </div>
  );
}

export default SinglePost;

/**
 *
 * a && b
 *
 * a = truthy? b gets returned
 * a = falsy? nothing happens
 *
 *
 *
 */
