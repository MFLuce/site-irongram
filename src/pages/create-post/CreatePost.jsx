import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingComponent from "../../components/Loading/Loading";
import { createPost } from "../../service/posts/post.service";
import * as PATHS from "../../utils/paths";

function CreatePost() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileInput(event) {
    const imageFromInput = event.target.files[0];

    setChosenPicture(imageFromInput);
  }

  function handleNormalInput(event) {
    setContent(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    if (!chosenPicture) {
      setError("You must select a picture to upload! You fool! 👀");
      setIsLoading(false);
      return;
    }

    const formBody = new window.FormData();
    formBody.append("content", content);
    formBody.append("juanPostPic", chosenPicture);

    createPost(formBody).then((res) => {
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.FEED_PAGE);
    });
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <h1>{error}</h1>}
        <input type="file" onChange={handleFileInput} />
        <br />
        <label>
          <input
            value={content}
            onChange={handleNormalInput}
            type="text"
            placeholder="Feeling blessed? Tell us more!"
          />
        </label>
        <button type="submit">Create a new post</button>
      </form>
    </div>
  );
}

export default CreatePost;
