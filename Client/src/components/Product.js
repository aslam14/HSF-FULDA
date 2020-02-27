import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
/**
 * Material UI cards for showing brief information of
 * each product in home page
 */

class Product extends Component {

  render() {
    const {
      product_id,
      product_name,
      product_img,
      product_description,
      product_category,
      product_cost,
      product_seller_name,
      product_seller_id
    } = this.props;

    return (
      <div className="col-md-3 col-lg-3 d-flex py-2 m-5" >
        
       <div className="product bg-white">
        <Link
        to={{
          pathname: "/detail"
        }}
        onClick={() => {
          this.props.productDetailID(product_id);
        }}
        >
          <div className="product-img">
            <img
              src={
                product_img === null ||
                product_img === "" ||
                product_img === "null"
                  ? "https://icon-library.net//images/product-icon-png/product-icon-png-29.jpg"
                  : product_img
              }
              style={{ maxHeight: "200px" }}
              alt="product_name"
            />
          </div>
          <div className="product-body">
            <Typography gutterBottom variant="p" component="h6">
              {product_name}
            </Typography>
            <Typography gutterBottom  variant="p" component="p">
              € {product_cost} 
            </Typography>
            
          </div>
          </Link>
        </div>
      
    </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    productDetailID: product_id => {
      console.log(product_id);
      dispatch({
        type: "SET_PRODUCT_DETAIL_ID",
        payload: product_id
      });
    }
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Product);
