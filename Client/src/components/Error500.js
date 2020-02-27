import React from "react";
import { Link } from "react-router-dom";
/**
 * custom page for internal server errors
 */
const Error5oo = () => {
  return (
    <div>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>500</h1>
          </div>
          <h2>Oops! Inetrnal Server Error</h2>
          <p>Sorry but the there are something wrong in server side.</p>
        </div>
      </div>
      <center>
        <Link to="/">Return to Home Page</Link>
      </center>
    </div>
  );
};
export default Error5oo;
