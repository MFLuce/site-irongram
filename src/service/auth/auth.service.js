import axios from "axios";
import { onSuccess, onError } from "../../utils/serverResponseHandlers";

export function signup(body) {
  return axios
    .post("http://localhost:5005/auth/signup", body)
    .then(onSuccess)
    .catch(onError);
}

export function login(body) {
  return axios
    .post("http://localhost:5005/auth/login", body)
    .then(onSuccess)
    .catch(onError);
}
