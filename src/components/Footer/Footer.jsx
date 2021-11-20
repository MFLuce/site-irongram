import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";

function Footer() {
  return (
    <footer>
      <div>IronGram | {new Date().getFullYear()}</div>

      <div>
        <Link to={PATHS.ABOUT_PAGE}>About</Link>
      </div>
    </footer>
  );
}

export default Footer;
