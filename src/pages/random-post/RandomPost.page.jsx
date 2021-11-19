import React, { useEffect, useState } from "react";
import { getRandomPost } from "../../service/posts/post.service";

function RandomPost() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    getRandomPost().then((randomPost) => {
      setPost(randomPost.data.post[0]);
      console.log(randomPost.data.post[0]);
    });
  }, []);

  return (
    <div>
      <h1>Random post page! 🍀</h1>
      <section>
        <img src={post?.image} alt="" width={"500px"} />
        <pre> {post?.content || ""} </pre>
        <p>
          <strong>By:</strong> {post?.owner.username}
        </p>
      </section>
    </div>
  );
}

export default RandomPost;
