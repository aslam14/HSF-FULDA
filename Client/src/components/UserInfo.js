import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import "../css/index.css"

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: { name: "", lastname: "", phone: "", email: "", photo_link: "", is_banned: 0 }
    };
  }

  async componentDidMount() {
    const params = { id: this.props.location.sellerId };
    await axios.get("/api/get/userInfo", { params }).then(result => {
      this.setState({ userData: result.data[0] })
      console.log(result.data[0]);
    });
  }

  banUserButton = () => {
    const isAdmin = this.state.userData.isAdmin;
    const userId = this.state.userData.id;
    const isBanned = this.state.userData.is_banned;

    if ((isAdmin || userId == window.sessionStorage.getItem("userid")) || !window.sessionStorage.getItem("isAdmin")) {
      return <div />;
    }

    if (isBanned) {
      return (
        <button className="btn btn-primary" onClick={(e) => this.unbanUser(userId, e)}>
          Unban user
        </button>
      );
    }

    return (
      <button className="btn btn-primary" onClick={(e) => this.banUser(userId, e)}>
        Ban user
      </button>
    );
  }

  getUser = async () => {
    const params = { id: this.props.location.sellerId };
    await axios.get("/api/get/userInfo", { params }).then(result => {
      this.setState({ userData: result.data[0] })
    });
  }

  banUser = async (userId) => {
    const data = {
      params: {
        userId: userId
      }
    };
    await axios
      .post("/api/post/banUser", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);

        this.getUser()
      })
      .catch(err => {
        console.log(err);
      });
  }

  unbanUser = async (userId) => {
    const data = {
      params: {
        userId: userId
      }
    };
    await axios
      .post("/api/post/unbanUser", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);

        this.getUser()
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const userData = this.state.userData;

    return (
      <div className="container">
        {/* <div className={alertClass} role="alert">
          {alertBody}
        </div> */}
          <div className="modal-body">
                    <center>
                    <img src={
                    userData.photo_link === null || userData.photo_link === ""
                      ? "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                      : userData.photo_link
                  }
                  className="avatar rounded-circle img-thumbnail"
                  alt="avatar"
                  width="140" height="140"/>
                    <h3 className="media-heading">{userData.name} {userData.lastname}</h3>
                    <span>Verified by us</span>
                    <div>
                {this.banUserButton()}
              </div>
                    </center>
                    <hr></hr>
                    <center>
                    <p className=""><strong>About Seller </strong>
                    {userData.description} </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem dui, tempor sit amet commodo a, vulputate vel tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem dui, tempor sit amet commodo a, vulputate vel tellus.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem dui, tempor sit amet commodo a, vulputate vel tellus.</p>
                   
                    </center>
                        <ul>
              <li>
                <div>
                  Contact number:  {userData.phone}
                  </div>
                <div>
                 
                </div>
              </li>
              <li>
                <div>
                  Email:  {userData.email}
                  </div>
                <div>
                 
                </div>
              </li>
            </ul>
                   
                </div>
      </div>
    );
  }
};
export default UserInfo;
