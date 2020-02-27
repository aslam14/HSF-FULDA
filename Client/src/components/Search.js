import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HeaderContext } from "./HeaderContext";
import Emitter from "./Emitter";

const Search = () => {
  const [values, setValues] = useContext(HeaderContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    Emitter.once("SEARCHBUTTONCLICKED", () =>
      searchItemsInDB(values.searchTerm)
    );
  }, []);

  const searchItemsInDB = async sterm => {
    console.log("TERM===========>" + sterm);
    const data = {
      params: {
        term: sterm
      }
    };
    await axios
      .get("/api/get/allproducts", data)
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
        // window.location.replace("/error500");
      });
  };

  const showProducts = result => {
    console.log(">>>>>");
    console.log(result);
  };

  return (
    <div className="container">
      <div className="col-sm-8 mt-4 offset-2">
        <table className="table" style={{ textAlign: "center" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.id}</td>
                <td>{rowData.name}</td>
                <td>{rowData.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
