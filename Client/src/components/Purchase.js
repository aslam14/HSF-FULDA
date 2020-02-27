import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";


class Purchase extends Component {
    render() {
        return (
            <div className="container-fluid h-100 d-flex justify-content-center">
                <div className="jumbotron my-auto">
                    <h1>Do you want to add more products?</h1>
                    <Link to="/" className="btn btn-secondary" onClick={
                        e => {
                            this.props.addToCart();
                        }
                    }>
                        <i className="fa fa-angle-left"></i> Continue Shopping
                    </Link>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        products: state.getProductReducer,
        // productsDetails: (productID)=>{fetchProductDetails(productID)}

    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: () => {
            dispatch({
                type: "BUYED_PRODUCT"

            });
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
