import axios from "axios";
import { onError, onSuccess } from "../../utils/serverResponseHandlers";

export function getPosts() {
  return axios.get("http://localhost:5005/posts").then(onSuccess);
}

export function getSinglePost(id) {
  return axios
    .get(`http://localhost:5005/posts/${id}`)
    .then(onSuccess)
    .catch(onError);
}
