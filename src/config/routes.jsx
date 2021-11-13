import { Navigate } from "react-router";
import AboutPage from "../pages/about/About.page";
import CreatePost from "../pages/create-post/CreatePost";
import Feed from "../pages/feed/Feed.page";
import HomePage from "../pages/home/Home.page";
import LoginPage from "../pages/login/Login.page";
import Profile from "../pages/profile/Profile.page";
import SignupPage from "../pages/signup/Signup";
import SinglePost from "../pages/single-post/SinglePost.page";
import * as PATHS from "../utils/paths";

const irongramRoutes = (props) => {
  const { user } = props;
  return [
    //   Main Routes
    {
      path: PATHS.HOME_PAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.ABOUT_PAGE,
      element: <AboutPage {...props} />,
    },
    {
      path: PATHS.SIGNUP_PAGE,
      element: <SignupPage {...props} />,
    },
    {
      path: PATHS.LOGIN_PAGE,
      element: <LoginPage {...props} />,
    },
    // Protected Routes
    {
      path: PATHS.FEED_PAGE,
      element: user ? (
        <Feed {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ), // if user is defined show feed, otherwise Navigate
    },
    {
      path: PATHS.CREATE_POST,
      element: user ? (
        <CreatePost {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ),
    },
    {
      path: PATHS.POST_PAGE,
      element: <SinglePost {...props} />,
    },
    {
      path: PATHS.CURRENT_USER_PROFILE,
      element: <Profile {...props} />,
    },
  ];
};

export default irongramRoutes;
