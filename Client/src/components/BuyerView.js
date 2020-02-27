import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class BuyerView extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.userId);
        console.log(props.userId);
        this.state = {
            isSeller: false,
            userData: {}
        };
        this.getUserData();
    }

    componentWillMount() {

    };

    componentDidUpdate() {
        console.log(this.props.userId);
    }

    getUserData = async () => {
        //NEED CHANGE
        const params = { id: 3 };
        await axios.get('/api/get/profile', { params }).then(result => {
            for (var attr in result.data[0]) {
                if (result.data[0][attr] === "undefined") {
                    console.log(result.data[0][attr]);
                    result.data[0][attr] = "";
                }
            }
            this.setState(
                this.state.userData = result.data[0],
                () => console.log(this.state.userData)
            );
        })
            .catch(err => {
                console.log(err);
            });
    };

    uploadPhoto  = async imgFile  => {
        var formData = new FormData();
        formData.append("files", imgFile);
        //NEED CHANGE
        formData.append("id", 3);
        await axios
          .post("/api/post/updateprofilepic", formData)
          .then(result => {
            if (result.status == 200) {
              console.log("Profile image upload=>" + result.data.image);
              this.setState(
                this.state.userData.photo_link = result.data.image,
                () => console.log(this.state.userData)
            );
            } else {
              console.log(result);
            }
          })
          .catch(err => {
            console.log(err);
            // window.location.replace("/error500");
          });
    };

    updateProfile = e => {
        e.preventDefault();
    };

    updateProfile = e => {
        e.preventDefault();
        this.updateProfileRequest();
      };
    
      updateProfileRequest = async () => {
      //NEED CHANGE
        const data = {
          id: 3,
          name: this.state.userData.name,
          lastname: this.state.userData.lastname,
          date_of_birth: this.state.userData.date_of_birth,
          email: this.state.userData.email,
          phone: this.state.userData.phone,
          photo_link: this.state.userData.photo_link,
          description: this.state.userData.description
        };
        await axios
          .post("/api/post/updateprofile", data)
          .then(result => {
            console.log(result.status);
          })
          .catch(err => {
            console.log(err);
          });
      };

    render() {
        return (
            <div>
                <br/>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="text-center">
                                <img  src={
                                            this.state.userData.photo_link === null || this.state.userData.photo_link === ""
                                                ? "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                                : this.state.userData.photo_link
                                        }  className="avatar rounded-circle img-thumbnail" alt="avatar" />
                                <h6></h6>
                                 <br/>               
                                <input type="file" className="form-control"  onChange={e => this.uploadPhoto(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="col-md-9 personal-info">
                            <div className="alert alert-info alert-dismissable">
                                <a className="panel-close close" data-dismiss="alert">×</a>
                                <i className="fa fa-coffee"></i>
                                This is an <strong>.alert</strong>. You are not a seller now. Contact us to become a seller.
        </div>
                            <h3>Personal info</h3>

                            <form className="form-horizontal" role="form" onSubmit={this.updateProfile}>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">First name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" value={this.state.userData.name}  
                                        onChange={e => (e.target.value)
                                     }/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Last name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" value={this.state.userData.lastname} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Email:</label>
                                    <div className="col-lg-8">
                                    {this.state.userData.email}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Password:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="password" value=""  onChange={e => (e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Confirm password:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="password" value=""   onChange={e => (e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label"></label>
                                    <div className="col-md-8">
                                        <input type="button" className="btn btn-primary" value="Save Changes" />
                                        <span></span>
                                        <input type="reset" className="btn btn-default" value="Cancel" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
                 
                );
    }
}

export default withRouter(BuyerView);