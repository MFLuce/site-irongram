import React, { useState } from "react";

function CreatePost() {
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" />
        <label>
          <input type="text" placeholder="Feeling blessed? Tell us more!" />
        </label>
        <button type="submit">Create a new post</button>
      </form>
    </div>
  );
}

export default CreatePost;
