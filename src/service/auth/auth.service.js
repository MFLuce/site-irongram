import axios from "axios";
import { getAccessToken, SERVER_URL } from "../../utils/consts";
import { onSuccess, onError } from "../../utils/serverResponseHandlers";

const authService = axios.create({
  baseURL: `${SERVER_URL}/auth`,
});

export function signup(body) {
  return authService
    .post("/signup", body)
    .then(onSuccess("signup"))
    .catch(onError("signup"));
}

export function login(body) {
  return authService
    .post("/login", body)
    .then(onSuccess("login"))
    .catch(onError("login"));
}

export function logoutRequest() {
  return authService
    .delete("/logout", {
      headers: {
        authorization: getAccessToken(),
      },
    })
    .then(onSuccess("logout"))
    .catch(onError("logout"));
}

export function getMe(authorization) {
  return authService
    .get("/me", {
      headers: {
        authorization,
      },
    })
    .then(onSuccess("getMe"))
    .catch(onError("getMe"));
}
