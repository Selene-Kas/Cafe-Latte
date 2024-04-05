import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "./api";
import cafe from '../src/assets/cafe.png' 

const Details = () => {
  const { id }= useParams();
  const [product, setProduct] = useState({});

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
    <h1> Details <img id="detailsLogo" src={cafe}/></h1> 
    {product &&(
    <ul className="singleProduct" > 
      <li>{product.name}</li>
      <li><img src={product.img} alt={product.name} /> </li>
      <li>Description: {product.description}</li>
      <li>Price: ${product.product_price}</li>
      <li>Qty: {product.qty_available}</li>
      <button> Add to Cart </button>
    </ul>
    )}
    </div>
  );
}

export default Details;