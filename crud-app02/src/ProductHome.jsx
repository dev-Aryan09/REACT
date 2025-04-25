import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./App.css";

const API_URL = "https://api.restful-api.dev/objects";

export function ProductHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      // console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(`ERROR fetching data: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Would you like to delete?");
      if (!confirmDelete) return;

      const res = await axios.delete(`${API_URL}/${id}`);
      console.log("DELETE Response", res);

      // Note:- dataType of product.id and id might be same, either string or number
      setProducts(products.filter((product) => product.id !== id));
      // setProducts(prev => prev.filter((product => product.id !== Number( id))));
    } catch (error) {
      console.log(error);
      alert("Failed to delete item. Check console for details");
    }
  };

  return (
    <div>
      <h2>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          CRUD form with Bootstrap
        </Link>
      </h2>
      <div className="d-flex justify-content-end">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>color</th>
            <th>capacity</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.data?.color || "N/A"}</td>
              <td>{product.data?.capacity || "N/A"}</td>
              <td>
                <Link
                  to={`/read/${product.id}`}
                  className="btn btn-sm btn-info me-2"
                >
                  Read
                </Link>
                <Link
                  to={`/update/${product.id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(product.id)}

                  //The below code delete the elememt from DOM

                  // onClick={(e) => {
                  //   if (e.target.tagName === "BUTTON") {
                  //     console.log("yes");
                  //     const row = e.target.closest("tr");
                  //     row.remove();
                  //     console.log(row.remove());
                  //   }
                  // }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
