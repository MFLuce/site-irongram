import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  getSinglePost,
  likePost,
  unlikePost,
} from "../../service/posts/post.service";
import styles from "./SinglePost.module.css";

function userInLikes(post, user) {
  if (!post || !user) {
    return false;
  }

  return post.likes.includes(user._id);
}

function SinglePost(props) {
  const { user } = props;
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorLogIn, setErrorLogIn] = useState(null);

  function heartToggle() {
    if (!user || !singlePost) {
      return displayErrorMessage();
    }
    const userAlreadyLiked = singlePost.likes.includes(user._id);
    if (userAlreadyLiked) {
      return unlike();
    }
    return like();
  }

  function displayErrorMessage() {
    setErrorLogIn("You need to be logged in");
    setTimeout(() => {
      setErrorLogIn("");
    }, 3000);
  }

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
  function unlike() {
    console.log(`ABOUT TO DO UNLIKE`);
    unlikePost(singlePost._id).then((serverResponse) => {
      if (!serverResponse.success) {
        return console.error(serverResponse.data);
      }
      console.log("serverResponse:", serverResponse.data);
      setSinglePost(serverResponse.data.post);
    });
  }

  function like() {
    // POST, PUT and PATCH -> order: endpoint, {req.body}, {headers}
    // GET and DELETE -> order: endpoint, {headers}
    console.log(`ABOUT TO DO LIKE`);
    likePost(singlePost._id).then((response) => {
      if (!response.success) {
        return console.error(response.data);
      }
      console.log("response:", response);
      setSinglePost(response.data.post);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // * if there is no user clicking on the button, will do nothing

  // * after clicking the button: if the user hasnt liked the post yet - like it now
  // * after clicking the button:
  /// TODO if we have time, we implement some error message to user in case of not loggedin

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
      <div>
        {errorLogIn && <h4 style={{ color: "red" }}>{errorLogIn}</h4>}
        <span
          onClick={heartToggle}
          style={{
            marginRight: 50,
            cursor: "pointer",
            backgroundColor: userInLikes(singlePost, user)
              ? "orange"
              : "transparent",
            padding: 3,
          }}
        >
          ❤️
        </span>
        <strong>{singlePost.likes.length}</strong> likes
      </div>
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
