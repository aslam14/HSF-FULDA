import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
/**
 * post product form for seller
 *
 */
const UserProductPost = props => {
  useEffect(() => {
    getCategories();
  }, []);

  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState(1);
  const [allCats, setAllCats] = useState([]);

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
      name: name,
      description: desc,
      price: price,
      seller_id: props.userId,
      picture_link: imageUrl,
      category_id: cat
    };
    await axios
      .post("/api/post/addproduct", data)
      .then(res => {
        alert("Product Posted Successfully");
        return <Redirect to="/user"/>
      //  window.location.replace("/user");
      })
      .catch(err => {
        console.log(err);
        // window.location.replace("/error500");
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
        // window.location.replace("/error500");
      });
  };
  return (
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
              imageUrl === null
                ? "https://icon-library.net//images/product-icon-png/product-icon-png-29.jpg"
                : imageUrl
            }
            className="card-img"
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
          <label htmlFor="post-button">{/* <h4>Send to review</h4> */}</label>
          <button
            id="post-button"
            name="post-button"
            type="submit"
            className="col-4 btn btn-primary"
          >
            Post
          </button>
          <button
            id="reset-button"
            name="reset-button"
            className="col-4 btn btn-info ml-3"
          >
            Reset
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default UserProductPost;
