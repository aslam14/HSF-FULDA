import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import UserProductPost from "./UserProductPost";
import UserProductList from "./UserProductList";
import AdminPanel from "./admin/AdminPanel";
import $ from "jquery";

/**
 * show/edit user profile.
 * send seller request
 * set profile photo
 * this component includes usereditproduct ,userproductList and userProductList
 */
const User = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    description: "",
    image: "",
    is_seller_requested: 0
  });
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [alertClass, setAlertClass] = useState(
    "alert alert-success mt-2 invisible"
  );
  const [alertBody, setAlertBody] = useState("");

  const adminPanel = isAdmin => {
    if (!isAdmin) {
      return;
    }
    return (
      <li className="nav-item">
        <a data-toggle="tab" href="#admin-panel" className="nav-link">
          Admin panel
        </a>
      </li>
    );
  };

  const banUserButton = (userId, isAdmin) => {
    if (
      isAdmin ||
      userId == window.sessionStorage.getItem("userid") ||
      !window.sessionStorage.getItem("isAdmin")
    ) {
      return;
    }

    return (
      <button className="btn btn-primary" onClick={e => banUser(userId, e)}>
        Ban user
      </button>
    );
  };

  useEffect(() => {
    getUserData();
  }, []);

  const banUser = async userId => {
    const data = {
      params: {
        userId: userId
      }
    };
    await axios
      .post("/api/post/banUser", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);
      })
      .catch(err => {
        console.log(err);
        // window.location.replace("/error500");
      });
  };

  const getUserData = async () => {
    const params = { id: window.sessionStorage.getItem("userid") };
    await axios
      .get("/api/get/profile", { params })
      .then(result => {
        for (var attr in result.data[0]) {
          if (result.data[0][attr] === "undefined") {
            console.log(result.data[0][attr]);
            result.data[0][attr] = "";
          }
        }
        console.log(result.data);
        setUserData(result.data[0]);
        console.log(result.data[0].isAdmin);
        window.sessionStorage.setItem("isAdmin", result.data[0].isAdmin);
        window.sessionStorage.setItem("isSeller", result.data[0].isSeller);
      })
      .catch(err => {
        console.log(err);
        // window.location.replace("/error500");
      });
  };
  const updateProfile = e => {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      500
    );
    e.preventDefault();
    updateProfileRequest();
  };

  const updateProfileRequest = async () => {
    const data = {
      id: window.sessionStorage.getItem("userid"),
      name: userData.name,
      lastname: userData.lastname,
      date_of_birth: userData.date_of_birth,
      email: userData.email,
      phone: userData.phone,
      photo_link: userData.photo_link,
      description: userData.description
    };
    if (password !== repassword) {
      setAlertBody("Passwords are not matched!");
      setAlertClass("alert mt-2 alert-danger");
      return;
    }
    if (password !== "" && password === repassword) {
      data["password"] = password;
    } else {
      data["password"] = "null";
    }

    await axios
      .post("/api/post/updateprofile", data)
      .then(result => {
        console.log(result.status);
        if (result.status === 200) {
          setAlertBody("User Data Updated Successfully...");
          setAlertClass("alert mt-2 alert-success");
        } else {
          setAlertBody("Unexpected error occurred...!");
          setAlertClass("alert mt-2 alert-danger");
        }
        setInterval(function() {
          setAlertClass("alert alert-success mt-2 invisible");
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        // window.location.replace("/error500");
      });
  };

  const uploadPhoto = async imgFile => {
    var formData = new FormData();
    formData.append("files", imgFile);
    formData.append("id", window.sessionStorage.getItem("userid"));
    await axios
      .post("/api/post/updateprofilepic", formData)
      .then(result => {
        if (result.status == 200) {
          console.log("Profile image upload=>" + result.data.image);
          setUserData({ ...userData, photo_link: result.data.image });
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        console.log(err);
        // window.location.replace("/error500");
      });
  };

  const discardChange = e => {
    getUserData();
  };

  const handleSellerRequest = async () => {
    const data = {
      userId: window.sessionStorage.getItem("userid")
    };

    await axios
      .post("/api/post/requestSeller", data)
      .then(result => {
        console.log(result.status);
        if (result.status === 200) {
          setAlertBody("User Data Updated Successfully...");
          setAlertClass("alert mt-2 alert-success");
        } else {
          setAlertBody("Unexpected error occurred...!");
          setAlertClass("alert mt-2 alert-danger");
        }
      })
      .catch(err => {
        console.log(err);
        // window.location.replace("/error500");
      });
  };

  return (
    <div className="container" id="mainProfile">
      <div className={alertClass} role="alert">
        {alertBody}
      </div>
      <div className="col-sm-10 offset-sm-1">
        <div className="row">
          <div className="col-md-12">
            <h1>
              {userData.name} {userData.lastname}
            </h1>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-4">
            <div className="text-center">
              <img
                src={
                  userData.photo_link === null || userData.photo_link === ""
                    ? "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    : userData.photo_link
                }
                className="avatar rounded-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>
              <input
                type="file"
                className="text-center mx-auto file-upload"
                onChange={e => uploadPhoto(e.target.files[0])}
              />
            </div>
            <br />
          </div>
          <div className="col-sm-8">
            <ul className="nav nav-tabs">
              <li className="active nav-item">
                <a data-toggle="tab" href="#home" className="nav-link">
                  Profile
                </a>
              </li>
              <li className={userData.isSeller == 0 ? "d-none" : "nav-item"}>
                <a data-toggle="tab" href="#product-post" className="nav-link">
                  Post Product
                </a>
              </li>
              <li className={userData.isSeller == 0 ? "d-none" : "nav-item"}>
                <a data-toggle="tab" href="#product-list" className="nav-link">
                  Products List
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="home">
                <hr />
                <form
                  autocomplete="off"
                  className="form"
                  onSubmit={updateProfile}
                  id="registrationForm"
                >
                  <div className="form-group">
                    <label htmlFor="first_name">
                      <h4>First name</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      id="first_name"
                      placeholder="first name"
                      value={userData.name}
                      title="enter your first name if any."
                      onChange={e =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">
                      <h4>Last name</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      id="last_name"
                      value={userData.lastname}
                      placeholder="last name"
                      title="enter your last name if any."
                      onChange={e =>
                        setUserData({ ...userData, lastname: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      <h4>Phone</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      id="phone"
                      value={userData.phone}
                      placeholder="enter phone"
                      title="enter your phone number if any."
                      onChange={e =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="birthday">
                      <h4>Birthday</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="birthday"
                      id="birthday"
                      value={userData.date_of_birth}
                      placeholder="enter your Birthday yyyy-MM-dd"
                      title="enter your bithday if any."
                      onChange={e =>
                        setUserData({
                          ...userData,
                          date_of_birth: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <h4>Email</h4>
                    </label>
                    <input
                      type="email"
                      className="form-control disabled"
                      name="email"
                      id="email"
                      readonly
                      value={userData.email}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">
                      <h4>Description</h4>
                    </label>
                    <input
                      type="description"
                      className="form-control"
                      id="description"
                      value={
                        userData.description === "undefined"
                          ? ""
                          : userData.description
                      }
                      placeholder="Description"
                      title="enter Description if there is any"
                      onChange={e =>
                        setUserData({
                          ...userData,
                          description: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <h4>Password</h4>
                    </label>
                    <input
                      type="password"
                      autocomplete="new-password"
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="password"
                      title="enter your password."
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password2">
                      <h4>Verify</h4>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password2"
                      id="password2"
                      placeholder="Re-enter Pasword"
                      title="enter your password2."
                      onChange={e => setRepassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <div className="col-12">
                      <br />
                      <button
                        className="col-lg-4 btn btn-primary"
                        type="submit"
                      >
                        Save
                      </button>

                      <button
                        className="col-lg-4 btn btn-info ml-3"
                        type="button"
                        onClick={discardChange}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
                <hr />
              </div>
              <div className="tab-pane" id="product-post">
                <hr />
                <UserProductPost
                  userId={window.sessionStorage.getItem("userid")}
                />
              </div>
              <div className="tab-pane" id="product-list">
                <hr />
                <UserProductList
                  userId={window.sessionStorage.getItem("userid")}
                />
              </div>
              <div className="tab-pane" id="transactions">
                <hr />
              </div>
              <div className="tab-pane" id="admin-panel">
                <hr />
                <AdminPanel userId={window.sessionStorage.getItem("userid")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
