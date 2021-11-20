import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./nav.css";

function Nav(props) {
  const { user } = props;
  return (
    <nav>
      <ul>
        <li>
          <Link to={PATHS.HOME_PAGE}>Home</Link>
        </li>
        <li>
          <Link to={PATHS.ABOUT_PAGE}>About</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to={PATHS.FEED_PAGE}>Feed</Link>
            </li>
            <li>
              <Link to={PATHS.CURRENT_USER_PROFILE}>Profile</Link>
            </li>
            <li>
              <Link to={PATHS.CREATE_POST}>Create a post</Link>
            </li>
            <li>
              <Link to={PATHS.RANDOM_POST}>I'm feeling lucky! 🍀</Link>
            </li>

            <button onClick={props.logout}>Logout</button>
          </>
        ) : (
          <>
            <li>
              <Link to={PATHS.SIGNUP_PAGE}>Signup</Link>
            </li>
            <li>
              <Link to={PATHS.LOGIN_PAGE}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
