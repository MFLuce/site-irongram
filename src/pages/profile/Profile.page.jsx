import axios from "axios";
import React, { useState } from "react";
import { SERVER_URL } from "../../utils/consts";

export default function Profile(props) {
  const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputKey, setInputKey] = useState("");
  const { user, setUser } = props;

  function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    if (!chosenPicture) {
      setError("You must select a picture to upload! You fool! 👀");
      setIsLoading(false);
      return;
    }

    const formBody = new window.FormData();
    formBody.append("profilePic", chosenPicture);
    formBody.append("userId", user._id);

    axios
      .post(`${SERVER_URL}/user/updateProfilePic`, formBody)
      .then((res) => {
        console.log(res.data);
        setUser({ ...user, profilePic: res.data.profilePic });
        setIsLoading(false);
        setInputKey(Date.now());
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function handleInputChange(event) {
    const imageFromInput = event.target.files[0];

    setChosenPicture(imageFromInput);
  }

  return (
    <div>
      <h1>{user.username}'s Profile </h1>

      <img
        src={
          isLoading
            ? "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"
            : user.profilePic
        }
        alt={`${user.username}'s profile`}
        height={"200px"}
      />

      {error && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}

      <form onSubmit={handleFormSubmit} method="POST">
        <input key={inputKey} type="file" onChange={handleInputChange} />
        <button type="submit">Upload Profile Picture!</button>
      </form>
    </div>
  );
}
