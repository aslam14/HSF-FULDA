import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let formEnabled = true;
let responseStatus = "";

async function onRegisterClick(event) {
  event.preventDefault();
  formEnabled = false;
  const formdata = new FormData(event.target);
  console.log(formdata);
  var data = {};
  for (let name of formdata.keys()) {
    const value = formdata.get(name);
    data[name] = value;
  }
  await axios
    .post("/api/post/signup", data)
    .then(response => {
      console.log("Response data ", response.data );
      responseStatus = response.data;
      if (response.data.code ==200) {
       // return <Redirect to="/login" />;
       window.location.replace("/");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export default function SignUp() {
  const classes = useStyles();


  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up with Sample Me
        </Typography>
        <form className={classes.form} noValidate onSubmit={onRegisterClick}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                color="secondary"
                type="text"
                maxlength="12"
                min="0"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
            <select class="browser-default custom-select">
            variant="outlined"
                required
                fullWidth
                <option selected>Select Role</option>
                <option value="1">Admin</option>
                <option value="2">Buyer</option>
               <option value="3">Seller</option>
            </select>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="secondary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
                color="secondary"
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled = {!formEnabled}
          >
            REGISTER
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" color="secondary">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
          <Grid container >
            <Grid item>
            {responseStatus}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}