import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Read() {
      const [products, setProducts] = useState([]);
      const {id} = useParams()
    
    useEffect(() => {
      FetchProducts();
    }, []);

    const FetchProducts = async () => {
      try {
        const response = await axios.get(`https://api.restful-api.dev/objects/${id}`);
        setProducts(response.data);
      } catch (error) {
        console.log(`ERROR fetching data: ${error.message}`);
      }
    };


    return (
      <div className=" d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-60 border bg-white shadow px-5 pb-5 rounded">
          <h3>Add a Product</h3>
          <div className="mb-2">
            <strong>id:{products.id}</strong>
          </div>
          <div className="mb-3">
            <strong>name:{products.name}</strong>
          </div>
          <div className="mb-3">
            <strong>color:{products.data?.color}</strong>
          </div>
          <div className="mb-3">
            <strong>capacity:{products.data?.capacity}</strong>
          </div>
          <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
          <Link to="/" className='btn btn-primary ms-3'>Back</Link>
        </div>
      </div>
    );
}
