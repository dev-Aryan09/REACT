import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Create() {
  const [values, setValues] = useState({
    name: "",
    data: {
      color: "",
      capacity: "",
    },
  }); // corrected

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data to API:", values); 
      
      const response = await axios.post(`https://api.restful-api.dev/objects`, {
        name: values.name,
        data: {
          color: values.data?.color,
          capacity: values.data?.capacity,
        },
      });
      console.log("Created item",response.data);
      navigate("/") // move back to Product hone page after submitting
    } catch (error) {
      console.log(`ERROR fetching data: ${error.message}`);
    }
  };

  return (
    <div className=" d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-60 border bg-white shadow px-5 pb-5 rounded">
        <h1>Add a Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="product name"
              value={values.name} // corrected
              onChange={(e) => {
                setValues({ ...values, name: e.target.value });
                // console.log(setValues({ ...values, id: e.target.value }));
              }}
              className="form-control"
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
                    data: {...values.data, color: e.target.value},
              })
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
                  data :{...values.data, capacity: e.target.value}
                  
                });
              }}
              className="form-control"
            />
          </div>
         
          <button className="btn btn-success">Create</button>
          <Link to="/" className=" btn btn-primary ms-2">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
