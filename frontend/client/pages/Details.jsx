import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "./api";

const Details = () => {
  const { id }= useParams();
  const [product, setProduct] = useState( );

  useEffect(()=>{
    async function getProductDetails() {
        const productDetails = await fetchSingleProduct(id);
       setProduct(productDetails);
       console.log(productDetails);
    }
    getProductDetails();
  }, [id] )
  
  return(
    <div>
    <h1>Details - {id} </h1> 
    <p> Hello: {id.product}</p>
    <ul className="productCard" > 
      <li>Name: </li>
      <li>Img: </li>
      <li>Description: </li>
      <li>Price: </li>
      <button> Add to Cart </button>
    </ul>
    </div>
  );
}

export default Details;