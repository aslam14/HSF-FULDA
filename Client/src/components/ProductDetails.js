import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/detail.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };

  }

  componentDidMount(){
      // const product_id= this.props.products.detailsId;
      // console.log("product_IDDI",product_id)
      // this.props.getProductDetails(product_id);
  }
  componentWillUnmount() {
    console.log("Details ID:", this.props.products.detailsId);
    const { resetDetailID } = this.props;
    const detailsID = this.props.products.detailsId;
    console.log(detailsID)
    resetDetailID(detailsID);
  }

  // handleChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({ [name]: value });
  // };

  render() {
  if(this.props.products.detailsId===null) {
      return <Redirect to="/" />;
    }

    if(this.props.products.detailsProduct.length == 0){
      return <Redirect to="/" />;
    }
    var cartButton;
    const {
      name,
        description,
        category_name,
        seller_name,
        seller_id,
        image,
        cost,

    } = this.props.products.detailsProduct[0];
      const product_id=this.props.products.detailsId;
      const isVisibleDetails=this.props.products.isDetailvisible;
      console.log("dfsdadsfdsprops",name);
    console.log("selleername",seller_name);

      if(product_id!==null && isVisibleDetails!==false) {
      return (
        <div className="container">
          <div className="card">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="preview col-md-6">
                  <div className="preview-pic tab-content">
                    <div className="tab-pane active" id="pic-1">

                      <img
                        src={
                            image === null ||
                            image === "" ||
                            image === "null"
                            ? "https://icon-library.net//images/product-icon-png/product-icon-png-29.jpg"
                            : image
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="details col-md-6">
                  <h3 className="product-title">{name}</h3>
                  <p className="product-description">{description}</p>
                  <p className="product-description">
                    Category: {category_name}
                  </p>              
                  <h5 className="price text-dark">
                    price: <span> {cost} </span>
                  </h5>
                  <h5 className="description">
                    Seller:&nbsp;&nbsp;
                    <Link
                      to={{
                        pathname: "/userInfo",
                        sellerId: seller_id
                      }}
                    >
                      { seller_name }
                    </Link>
                  </h5>
                  <div className="action">
                  <Link to="/" className="add-to-cart btn btn-secondary m-2">
                      <i className="fa fa-angle-left"></i> Continue Shopping
                    </Link>
                    {/*const product_id=this.props.products.detailsId;*/}
                    {this.props.products.isCartButtonDisable===true ?
                        ( <button
                            className="delete-cart btn btn-danger disabled"
                            id="add-to-cart"
                            type="button"
                        >
                          Item added to Cart
                        </button>):
                        ( <button
                            className="add-to-cart btn btn-danger"
                            id="add-to-cart"
                            onClick={
                              window.sessionStorage.getItem("userid") !== null
                                ? this.props.addLoggedInCart.bind(
                                this,
                                product_id,
                                // this.state.quantity
                                )
                                :
                                this.props.addToCart.bind(
                                    this,
                                    product_id,
                                    // this.state.quantity
                                )
                            }
                            type="button"
                          >
                          Add to Cart
                          </button>)
                          
                    }
                    
                  </div>
                  
                  {console.log(this.props)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
const mapStateToProps = state => {
  return {
    products: state.getProductReducer,
    // productsDetails: (productID)=>{fetchProductDetails(productID)}

  };
};

function addCartItemDB(product_id, dispatch) {
  // function(dispatch){
  //console.log(quantity);
  return axios
    .post("/api/post/addtocart", {
      id: window.sessionStorage.getItem("user_id"),
      product_id: product_id,
      //quantity: quantity
    })
    .then(response => {
      if (response.data.code === 200) {
        dispatch({
          type: "ADD_TO_CART",
          payload: product_id,
          //quantity: quantity
        });
      }
      console.log(response);
    });
}



const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product_id) => {
        console.log("CART_ID",product_id)
      dispatch({
        type: "ADD_TO_CART",
        payload: product_id,
        //quantity: quantity
      });
    },
    resetDetailID:(detailsID)=>{
      dispatch({
        type:"RESET_DETAIL",
        payload:detailsID
      })
    },
    addLoggedInCart: (product_id) => {
        console.log("CART_ID:",product_id)
      addCartItemDB(product_id, dispatch);
    },
      }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
