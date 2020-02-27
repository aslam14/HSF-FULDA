import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../css/checkout.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";



class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyed:false
    };

  }
  messagehandle(e)
  {
    this.setState({buyed:true});
    console.log("buy item ",this.buyed)

  }
  render() {

    if (
      // this.props.products.cartItems.length == "undefined" ||
      // this.props.products.cartItems.length == 0
        this.props.products.purchased===true
    ) {
      console.log("exec");
      return <Redirect to="/purchase" />;
    } else {
     
      return (
        <div className="container p-5">
          {this.props.products.cartItems.length > 0 ? (
            <table id="cart" className="table table-hover table-condensed">
              <thead>
                <tr>
                  <th >Image</th>
                  <th >Product Name</th>
                  <th >Price</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.products.cartItems.map((product, index) => (
                  <tr key={index}>
                    <td data-th="Product" >
                      <div className="col-sm-3 hidden-xs">
                        {console.log("pictur",product.image)}
                          <img
                            src={
                              product.image === null ||
                              product.image === "" ||
                              product.image === "null"
                                ? "https://icon-library.net//imagesproduct-icon-png/product-icon-png-29.jpg"
                                : product.image
                            }
                            alt={product.name}
                            className="img-responsive"
                            style={{ maxHeight: "200px" }}
                          />
                        </div> 
                    </td>
                    <td data-th="name">
                    {product.name}
                    </td>
                    <td data-th="Price" >{product.cost}€</td>
                    <td className="actions col-xs-1" data-th="">
                      <button
                        onClick={
                          window.sessionStorage.getItem("userid") !== null
                            ? e => {
                                this.props.removeCartitemDb(product.id);
                              }
                            : this.props.removeCartItem.bind(this, product.id)
                        }
                        className="btn btn-danger btn-md"
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="visible-xs">
                  <td colSpan="1" className="hidden-xs"></td>
                  <td colSpan="1" className="hidden-xs text-right">
                    <strong>Total: {" "}
                    </strong>
                  </td>
                  <td className="text-center">
                    <strong>
                      {this.props.products.cartItems.reduce(
                        (price, addprice) => price + addprice.cost,
                        0
                      )}{" "}
                      €
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/" className="btn btn-secondary">
                      <i className="fa fa-angle-left"></i> Continue Shopping
                    </Link>
                  </td>
                  <td colSpan="1" className="hidden-xs"></td>
                  <td className="hidden-xs text-center"></td>
                  <td>
                    {window.sessionStorage.getItem("userid") !== null ? (
                        <button
                            onClick={
                              e => {
                               const buy= this.props.buyItem();
                              }
                            }
                            className="btn btn-primary btn-block"
                        >
                          Buy Now <i className="fa fa-angle-right"></i>
                        </button> ): (<Link to={{pathname:'/login',fromCart:'cart'}} className="btn btn-primary btn-block" >{"Buy Now"}</Link> )}
                  </td>
                </tr>
              </tfoot>
            </table>
          )
          : (
          <div className="alert bg-danger p-5 m-5" role="alert">
           <h4 class="text-center text-white"> Cart is Empty!!!</h4>
          </div>)
          }
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.getProductReducer
  };
};
function removeFromItem(product_id, dispatch) {
  return axios
    .post("/api/post/deleteitemincart", {
      user_id: window.sessionStorage.getItem("userid"),
      product_id: product_id
    })
    .then(response => {
      if (response.data.code == 200) {
        dispatch({
          type: "DELETE_FROM_CART",
          payload: product_id
        });
      }
    });
}
function buyItem(userID, dispatch) {
  // console.log("USERID:",userID)
  return axios
    .post("/api/post/buy_item", {
      userID: window.sessionStorage.getItem("userid")
    })
    .then(response => {
      if (response.data.code == 200) {
        dispatch({type: "BUY_PRODUCT",payload: true})
      }
    });
}

const mapDispatchToProps = dispatch => {
  return {
    removeCartitemDb: product_id => {
      removeFromItem(product_id, dispatch);
    },

    removeCartItem: product_id => {
      dispatch({
        type: "DELETE_FROM_CART",
        payload: product_id
      });
    },
    // quantity: (event, product) => {
    //   // console.log(product);
    //
    //   dispatch({
    //     type: "QUANTITY",
    //     payload: product,
    //     quantity: event.target.value
    //   });
    // },
    buyItem: () => {
      let userID = window.sessionStorage.getItem("userid");
      buyItem(userID,dispatch);
      // console.log(product);


    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
