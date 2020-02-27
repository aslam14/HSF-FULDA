import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HeaderContext } from "../HeaderContext";
import Emitter from "../Emitter";

const UserList = () => {
  const [values, setValues] = useContext(HeaderContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, [values.searchTerm]);

  const getUsers = async sterm => {
    const data = {
      params: {
        term: sterm
      }
    };
    await axios
      .get("/api/get/notverifiedassellers", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.log(`Response data is not array = ${response.data}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

const approveUser = async userId => {
    console.log("userId" + userId);
    const data = {
      params: {
        userId: userId
      }
    };
    await axios
      .post("/api/post/grantsellerrole", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);
         
        getUsers();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const rejectUser = async userId => {
    console.log("userId" + userId);
    const data = {
      params: {
        userId: userId
      }
    };
    await axios
      .post("/api/post/rejectSellerRole", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);
         
        getUsers();
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
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Lastname</th>
              <th scope="col">Phone</th>
              <th scope="col">Description</th>
              <th scope="col">Approve</th>
              <th scope="col">Reject</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.id}</td>
                <td>{rowData.email}</td>
                <td>{rowData.name}</td>
                <td>{rowData.lastname}</td>
                <td>{rowData.phone}</td>
                <td>{rowData.description}</td>
                <th> <button class="btn btn-success" onClick={(e) => approveUser(rowData.id, e)}>Approve</button></th>
                <th> <button class="btn btn-danger" onClick={(e) => rejectUser(rowData.id, e)}>Reject</button></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
