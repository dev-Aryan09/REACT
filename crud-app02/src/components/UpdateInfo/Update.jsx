import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Update() {
  // const [products, setProducts] = useState([]);
  const [values, setValues] = useState({
    name: "",
    data: {
      color: "",
      capacity: "",
    },
  });
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    FetchProducts();
  }, []);

  const FetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://api.restful-api.dev/objects/${id}`
      );
      setValues(response.data);
    } catch (error) {
      console.log(`ERROR fetching data: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("sending data to API:", values);
      console.log("ID:", id);

      const response = await axios.put(
        `https://api.restful-api.dev/objects/${id}`, // replaced -> values.id
        {
          name: values.name,
          data: {
            color: values.data.color,
            capacity: values.data.capacity,
          },
        }
      );
      console.log("Item updated:", response.data);
      navigate("/"); // move back to Product hone page after submitting
    } catch (error) {
      console.log(`ERROR updating data: ${error.message}`);
    }
  };
  return (
    <div className=" d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-60 border bg-white shadow px-5 pb-5 rounded">
        <h1>Update a Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="product name"
              value={values.name}
              className="form-control"
              onChange={(e) => {
                setValues({ ...values, name: e.target.value });
                // console.log(setValues({ ...values, id: e.target.value }));
              }}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={values.data.color} // corrected
              onChange={(e) => {
                setValues({
                  ...values,
                  data: { ...values.data, color: e.target.value },
                });
              }}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="capacity"
              placeholder="capacity"
              value={values.data.capacity} // corrected
              onChange={(e) => {
                setValues({
                  ...values,
                  data: { ...values.data, capacity: e.target.value },
                });
              }}
              className="form-control"
            />
          </div>
          <button className="btn btn-success">Update</button>
          <Link to="/" className=" btn btn-primary ms-w">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
