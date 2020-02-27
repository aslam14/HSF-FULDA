import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HeaderContext } from "../HeaderContext";
import Emitter from "../Emitter";

const ProductList = () => {
  const [values, setValues] = useContext(HeaderContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts();
  }, [values.searchTerm]);

  const getProducts = async sterm => {
   
    const data = {
      params: {
        term: sterm
      }
    };
    await axios
      .get("/api/get/notapprovedproducts", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);
        if (Array.isArray(response.data)) {
          setData(response.data);
          showProducts(response.data);
        } else {
          console.log(`Response data is not array = ${response.data}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const showProducts = result => {
    console.log(">>>>>");
    console.log(result);
  };

const approveProduct = async productId => {
    console.log("productId" + productId);
    const data = {
      params: {
        productId: productId
      }
    };
    await axios
      .post("/api/post/validateproduct", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);
         
        getProducts();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const rejectProduct = async productId => {
    console.log("productId" + productId);
    const data = {
      params: {
        productId: productId
      }
    };
    await axios
      .post("/api/post/rejectProduct", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);
         
        getProducts();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="col-sm-8 mt-4 offset-2">
        <table className="table" style={{ textAlign: "center" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Approve</th>
              <th scope="col">Reject</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.id}</td>
                <td>{rowData.name}</td>
                <td>{rowData.description}</td>
                <th> <button class="btn btn-success" onClick={(e) => approveProduct(rowData.id, e)}>Approve</button></th>
                <th><button class="btn btn-danger" onClick={(e) => rejectProduct(rowData.id, e)}>Reject</button></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
