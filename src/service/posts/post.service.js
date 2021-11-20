import axios from "axios";
import { getAccessToken, sendUser, SERVER_URL } from "../../utils/consts";
import { onError, onSuccess } from "../../utils/serverResponseHandlers";

const postService = axios.create({
  baseURL: `${SERVER_URL}/posts`,
});

export function getPosts() {
  const authorization = getAccessToken();
  console.log("authorization:", authorization);
  return postService
    .get("/", {
      headers: {
        authorization: getAccessToken(),
      },
    })
    .then(onSuccess("getPosts"))
    .catch(onError("getPosts"));
}

export function getSinglePost(id) {
  return postService
    .get(`/${id}`)
    .then(onSuccess("getSinglePost"))
    .catch(onError("getSinglePost"));
}

export function createPost(formBody) {
  return postService
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-post"))
    .catch(onError("create-post"));
}

export function getRandomPost() {
  return postService
    .get("/randomPost", {
      headers: {
        authorization: getAccessToken(),
      },
    })
    .then(onSuccess("get-random-post"))
    .catch(onError("get-random-post"));
}

export function likePost(id) {
  return postService
    .patch(
      "/like",
      {
        id,
      },
      {
        headers: {
          authorization: getAccessToken(),
        },
      }
    )
    .then(onSuccess("like-post"))
    .catch(onError("like-post"));
}

export function unlikePost(id) {
  return postService
    .patch(
      "/unlike",
      {
        id,
      },
      {
        headers: {
          authorization: getAccessToken(),
        },
      }
    )
    .then(onSuccess("unlike-post"))
    .catch(onError("unlike-post"));
}
