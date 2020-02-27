import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";



export class Contactus extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitcontactForm = this.submitcontactForm.bind(this);

  };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  async submitcontactForm(event) {
    event.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      let responseStatus = "";
      const formdata = new FormData(event.target);
      var data = {};
      for (let name of formdata.keys()) {
        const value = formdata.get(name);
        data[name] = value;
      }
      await axios
        .post("/api/post/contact", data)
        .then(response => {
          console.log("Response data ", response.data);
          responseStatus = response.data;
          if (response.data.code == 200) {
            axios
              .post("/api/post/contact", {
                name: this.state.fields["name"],
                lastname: this.state.fields["lastname"],
                email: this.state.fields["email"],
                contactno: this.state.fields["contactno"],
                message: this.state.fields["message"]
              })  
              .then(response => {
                if (response.data.code == 200) {
                  console.log(response);
                  window.sessionStorage.setItem("userid", response.data.userid);
                  window.sessionStorage.setItem("userrole", response.data.userrole);
                  window.location.replace("/");
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your name.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "*Please enter your lastname.";
    }

    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
      var pattern_hs = new RegExp(/\w+\.\w+(\@\w+\.hs-fulda.de)/)
      if (!pattern_hs.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter hs-fulda email-ID.";
      }
    }
    if (!fields["contactno"]) {
      formIsValid = false;
      errors["contactno"] = "*Please enter your mobile no.";
    }
    if (!fields["message"]) {
      formIsValid = false;
      errors["message"] = "*Message field can't be empty";
    }
    
    this.setState({
    errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
    <div className="auth-wrapper">
        <div className="auth-inner">
          <div id="main-registration-container">
            <div id="register" className="">
              <h3 className="text-center">Contact Us</h3>
              <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
                <div className="form-group">
                  <label>First Name </label>
                  <input type="text" className="form-control" name="name" placeholder="Enter Your First name" value={this.state.fields.username} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.name}</div>
                </div>
                <div className="form-group">

                  <label>Last Name</label>
                  <input type="text" className="form-control" name="lastname" placeholder="Enter Your Last name" value={this.state.fields.lastname} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.lastname}</div>
                </div>
                <div className="form-group">
                  <label>Email ID</label>
                  <input type="text" className="form-control" name="email" placeholder="Enter Your Email Id" value={this.state.fields.email} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.email}</div>
                </div>
                <div className="form-group">
                  <label>Contact number</label>
                  <input type="number" className="form-control" name="contactno" placeholder="+49123XXXXXXXX" value={this.state.fields.contactno} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.contactno}</div>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea type="text" className="form-control" name="message" placeholder="Your message here" rows="4" value={this.state.fields.message} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.message}</div>
                </div>
                
                <input type="submit" className="btn btn-danger btn-block" value="Send message" />
                </form>

            </div>
          </div>
        </div>
      </div>
  );
}
}

export default Contactus;