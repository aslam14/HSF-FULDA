import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import Emitter from "./Emitter";
import $ from "jquery";
import { Redirect } from "react-router-dom";
/**
 * edit product information, set photo and emits product updated event
 *
 */
const EditProduct = props => {
  useEffect(() => {
    getCategories();
    setName(props.product.name);
    setPrice(props.product.price);
    setDesc(props.product.description);
    setImageUrl(props.product.picture_link);
    setCat(props.product.category_id);
    setAlertClass("alert alert-success mt-2 d-none");
  }, [props.product]);

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [allCats, setAllCats] = useState([]);
  const [alertClass, setAlertClass] = useState(
    "alert alert-success mt-2 d-none"
  );
  const [alertBody, setAlertBody] = useState("");

  const uploadImage = async imgFile => {
    console.log("File path = " + imgFile);
    var formData = new FormData();
    formData.append("id", props.userId);
    formData.append("files", imgFile);
    await axios
      .post("/api/post/uploadpic", formData)
      .then(res => {
        if (res.status == 200) {
          console.log("Upload Result => " + res.data);
          setImageUrl(res.data.image);
        }
      })
      .catch(err => {
        console.log(err);
        // window.location.replace("/error500");
      });
  };

  const postProduct = async e => {
    e.preventDefault();
    const data = {
      id: props.product.id,
      name: name,
      description: desc,
      price: price,
      seller_id: props.userId,
      picture_link: imageUrl,
      catid: cat
    };
    await axios
      .post("/api/post/editproduct", data)
      .then(res => {
        setAlertBody("Product Updated Successfully.");
        setAlertClass("alert mt-2 alert-success");
        Emitter.emit("PRODUCTUPDATED");
        setInterval(function() {
          $("#modalClose").click();
        }, 2000);
      })
      .catch(err => {
        alert(err);
      });
  };

  const getCategories = async () => {
    await axios
      .get("/api/get/categories")
      .then(response => {
        if (Array.isArray(response.data)) {
          setAllCats(response.data);
          console.log("Categories: " + JSON.stringify(response.data, null, 2));
        } else {
          console.log(`Response data is not array = ${response.data}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  if (window.sessionStorage.getItem("userid") !== null) {
    return (
      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Product "{name}"
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className={alertClass} role="alert">
                {alertBody}
              </div>
              <form className="form-horizontal" onSubmit={postProduct}>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="product_name">
                      <h4>Product Name</h4>
                    </label>
                    <input
                      id="product_name"
                      name="product_name"
                      placeholder="Product name"
                      className="form-control input-md"
                      required=""
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_category">
                      <h4>Product Category</h4>
                    </label>
                    <select
                      id="product_category"
                      name="product_category"
                      className="form-control"
                      value={cat}
                      onChange={e => setCat(e.target.value)}
                    >
                      {allCats.map((catData, index) => (
                        <option key={index} value={catData.id}>
                          {catData.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="product-price">
                      <h4>Product Price</h4>
                    </label>
                    <input
                      id="product-price"
                      name="product-price"
                      placeholder="Price"
                      className="form-control input-md"
                      type="number"
                      min="0.01"
                      step="0.01"
                      max="2500"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_description">
                      <h4>Product Description</h4>
                    </label>
                    <textarea
                      className="form-control"
                      id="product_description"
                      placeholder="Description"
                      name="product_description"
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="product-image">
                      <h4>Product Image</h4>
                    </label>
                    <img
                      src={
                        imageUrl === null || imageUrl === ""
                          ? "https://icon-library.net//images/product-icon-png/product-icon-png-29.jpg"
                          : imageUrl
                      }
                      className="card-img img-thumbnail"
                      alt="Product Image"
                    />
                    <input
                      id="product-image"
                      name="product-image"
                      className="input-file"
                      type="file"
                      onChange={e => uploadImage(e.target.files[0])}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      id="post-button"
                      name="post-button"
                      type="submit"
                      className="col-md-4 btn btn-primary"
                      onClick={e => $("#editModal").scrollTop(0)}
                    >
                      Edit
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                id="modalClose"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default EditProduct;
