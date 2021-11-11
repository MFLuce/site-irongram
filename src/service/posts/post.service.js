import axios from "axios";
import { getAccessToken, SERVER_URL } from "../../utils/consts";
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
