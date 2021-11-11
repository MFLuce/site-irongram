import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import AboutPage from "./pages/about/About.page";
import Feed from "./pages/feed/Feed.page";
import HomePage from "./pages/home/Home.page";
import LoginPage from "./pages/login/Login.page";
import Signup from "./pages/signup/Signup";
import SinglePost from "./pages/single-post/SinglePost.page";
import { getMe, logoutRequest } from "./service/auth/auth.service";
import { getAccessToken, removeAccessToken } from "./utils/consts";
import * as PATHS from "./utils/paths";

function App() {
  const [user, setUser] = useState(undefined);

  function authenticate(userData) {
    setUser(userData);
  }

  function logout() {
    logoutRequest().finally(() => {
      removeAccessToken();
      setUser(undefined);
    });
  }

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return;
    }

    getMe(accessToken).then((response) => {
      if (!response.data.user) {
        removeAccessToken();
        // this shouldnt happen, but it can. why? javascript. thats why
        return;
      }
      authenticate(response.data.user);
    });
  }, []);

  return (
    <div className="App">
      <Nav user={user} logout={logout} />
      <Routes>
        <Route path={PATHS.HOME_PAGE} element={<HomePage />} />
        <Route path={PATHS.ABOUT_PAGE} element={<AboutPage />} />
        <Route path={PATHS.FEED_PAGE} element={<Feed user={user} />} />
        <Route path={PATHS.POST_PAGE} element={<SinglePost />} />
        <Route
          path={PATHS.SIGNUP_PAGE}
          element={<Signup authenticate={authenticate} />}
        />
        <Route
          path={PATHS.LOGIN_PAGE}
          element={<LoginPage authenticate={authenticate} />}
        />
      </Routes>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
