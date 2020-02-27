import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditProduct from "./UserEditProduct";
import Emitter from "./Emitter";
/**
 * shows the list of sellers posted products ,
 *  listens to product updated event from userEditProduct component
 * handles delete products.
 *
 */
const UserProductList = props => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    getUserProducts();
    Emitter.on("PRODUCTUPDATED", () => getUserProducts());
  }, []);

  const deleteProduct = async (pid, pName) => {
    confirmAlert({
      title: "Delete Confirmation",
      message: `Are you sure that you want to delete product ${pName}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete("/api/delete/product", { data: { pid: pid } })
              .then(res => {
                console.log(res);
                getUserProducts();
              });
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };
  const getUserProducts = async () => {
    const params = { id: props.userId };
    console.log("UserID:" + props.userId);
    await axios
      .get("/api/get/productofuser", { params })
      .then(response => {
        console.log(`Response Status = ${response.status}`);
        console.log(
          "PRODUCTS OF USER:" + JSON.stringify(response.data, null, 2)
        );
        setProducts(response.data);
      })
      .catch(err => {
        console.log(err);
        // window.location.replace("/error500");
      });
  };
  return (
    <div>
      {products.map((pData, index) => (
        <div
          className={(() => {
            if (pData.buyer_id !== null) {
              return "card border-primary mb-2";
            } else {
              if (pData.is_validated.data[0] === 1) {
                return "card border-success mb-2";
              } else {
                return "card border-warning mb-2";
              }
            }
          })()}
          style={{ padding: "0", background: "white" }}
          key={index}
        >
          <div
            className={(() => {
              if (pData.buyer_id !== null) {
                return "card-header text-primary";
              } else {
                if (pData.is_validated.data[0] === 1) {
                  return "card-header text-success";
                } else {
                  return "card-header text-warning";
                }
              }
            })()}
          >
            {(() => {
              if (pData.buyer_id !== null) {
                return (
                  "Sold on " +
                  new Date(pData.sold_date).toLocaleDateString("de-DE")
                );
              } else {
                if (pData.is_validated.data[0] === 1) {
                  return "Active";
                } else {
                  return "Rejected/Pending";
                }
              }
            })()}
          </div>
          <div className="card-body row">
            <div className="col-md-4">
              <img
                src={
                  pData.picture_link === null || pData.picture_link === ""
                    ? "https://icon-library.net//images/product-icon-png/product-icon-png-29.jpg"
                    : pData.picture_link
                }
                className="card-img"
                alt="Product Image"
              />
            </div>
            <div className="col-md-8">
              <h5 className="card-title">{pData.name}</h5>
              <p className="card-text">{pData.description}</p>
              <p className="card-text">
                <small className="text-muted">Price: {pData.price} €</small>
              </p>
            </div>
          </div>
          {pData.buyer_id === null ? (
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={e => deleteProduct(pData.id, pData.name)}
              >
                Delete
              </button>
              <button
                className="btn btn-info ml-3"
                onClick={e => setEditProduct(pData)}
                data-toggle="modal"
                data-target="#editModal"
              >
                Edit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
      <EditProduct product={editProduct} />
    </div>
  );
};

export default UserProductList;
