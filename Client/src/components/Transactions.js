import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HeaderContext } from "./HeaderContext";
import Emitter from "./Emitter";
/**
 * shows the table of user transactions as buyer
 */
const Transactions = props => {
  const [values, setValues] = useContext(HeaderContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransactions(props.userId);
  }, [values.searchTerm]);

  const getTransactions = async userId => {
    const params = { id: userId };
    await axios
      .get("/api/get/getTransactions", { params })
      .then(response => {
        console.log(`Response Status = ${response.status}`);
        if (Array.isArray(response.data)) {
          console.log("Response data", response.data);
          setData(response.data);
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
    <div className="container">
      <div className="mt-4">
        <table className="table table-striped" style={{ textAlign: "center" }}>
          <thead className="thead-light">
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Seller</th>
              <th scope="col">Transaction date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.name}</td>
                <td>{rowData.price}</td>
                <td>{rowData.seller_name}</td>
                <td>
                  {rowData.sold_date.toString("yyyy-MM-dd").substring(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
