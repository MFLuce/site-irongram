import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import irongramRoutes from "./config/routes";
import AboutPage from "./pages/about/About.page";
import CreatePost from "./pages/create-post/CreatePost";
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
        {irongramRoutes({
          user,
          setUser,
          authenticate,
        }).map((object) => (
          <Route
            key={object.path}
            path={object.path}
            element={object.element}
          />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
