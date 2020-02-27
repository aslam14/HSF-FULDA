import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import './App.css';
import Product from "./components/Product";
import SearchResults from "./components/SearchResults";
import ProductMinified from "./components/ProductMinified";
import ProfileView from "./components/ProfileView";
import Contactus from "./components/Contactus";
import BuyerView from "./components/BuyerView";
import Search from "./components/Search";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import User from "./components/User";
import UserList from "./components/admin/UserList";
import ProductList from "./components/admin/ProductList";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import UserInfo from "./components/UserInfo";
import Error5oo from "./components/Error500";
import Purchase from "./components/Purchase";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import ReactGA from "react-ga";
import GA from "./utils/GoogleAnalytics";
import { Provider } from "react-redux";
import store from "./store/store";
import { HeaderProvider } from "./components/HeaderContext";
import AdminPanel from './components/admin/AdminPanel';
import Admin from './components/admin/AdminLogin';

class App extends Component {
  render() {
    return (
  <Provider store={store}>
    <Router>
      {GA.init() && <GA.RouteTracker />}
      <div id="wrap">
        <HeaderProvider>
          <div id="content" style={{ paddingBottom: "100px" }}>
            <Header />
            <Switch>
              <Route path="/product/id=:id" component = {Product} />
              <Route path="/search/:type?/:term?" component = {SearchResults} />
              <Route path="/publicprofile" component = {ProfileView} />
              <Route path="/contactus" component = {Contactus} />
              <Route path="/publicprofile" component = {ProfileView} />
              <Route path="/buyerview" component = {BuyerView} />

              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/detail" component={ProductDetails} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/purchase" component={Purchase} />
              <Route path="/signup" component={SignUp} />
              <Route exact path="/user" component={User} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/adminPanel" component={AdminPanel} />
              <Route exact path="/adminUsers" component={UserList} />
              <Route exact path="/adminProducts" component={ProductList} />
              <Route exact path="/userInfo" component={UserInfo} />
              <Route path="/error500" component={Error5oo} />
              <Route path="*" component={NotFound} />

              </Switch>
          </div>
          <Footer />
        </HeaderProvider>
      </div>
    </Router>
  </Provider>
  );
  }
}

function initializeReactGA() {
  ReactGA.initialize("UA-154627567-1");
  ReactGA.pageview("/");
}

//ReactDOM.render(Contents, document.getElementById("root"));

export default App;