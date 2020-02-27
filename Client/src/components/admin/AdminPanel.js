import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="container">
      <div className="col-sm-8 mt-4 offset-2">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0 col">
           
            <button class="btn btn-primary m-3 py-2 ">
                <Link className="adminlink" to="/adminUsers" color="white">
                Approve users
                </Link>
              </button>
              <button class="btn btn-primary bg-black m-3 py-2">
                <Link className="adminlink" to="/adminProducts">
                Approve Products
                </Link>
              </button>
          </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
