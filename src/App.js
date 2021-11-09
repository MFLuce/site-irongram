import "./App.css";
import * as PATHS from "./utils/paths";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/Home.page";
import AboutPage from "./pages/about/About.page";
import Nav from "./components/Nav/Nav";
import Feed from "./pages/feed/Feed.page";
import SinglePost from "./pages/single-post/SinglePost.page";
import Signup from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login.page";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path={PATHS.HOME_PAGE} element={<HomePage />} />
        <Route path={PATHS.ABOUT_PAGE} element={<AboutPage />} />
        <Route path={PATHS.FEED_PAGE} element={<Feed />} />
        <Route path={PATHS.POST_PAGE} element={<SinglePost />} />
        <Route path={PATHS.SIGNUP_PAGE} element={<Signup />} />
        <Route path={PATHS.LOGIN_PAGE} element={<LoginPage />} />
      </Routes>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
