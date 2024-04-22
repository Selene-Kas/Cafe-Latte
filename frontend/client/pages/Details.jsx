import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleProduct } from "./api";
import cafe from '../src/assets/cafe.png';
import { fetchUserCart, fetchMe } from "./api";

const Details = ({token, setCartProducts, cartProducts}) => {
  const { id }= useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    async function getProductDetails() {
        const productDetails = await fetchSingleProduct(id);
       setProduct(productDetails);
       //console.log(productDetails);
    }
    getProductDetails();
  }, [] )
  
  const handleClick = async() => {
    async function getMe(){
      const me = await fetchMe(token);
      return me;
      }

      async function getUserCart(userId){
      return await fetchUserCart(userId);
      }
      const me =await getMe();
      const cart =await getUserCart(me.id);
      console.log(me);
      console.log(cart);

    const existingCartItem = cartProducts.find(item => item.product_id === product.id);
    
    if (existingCartItem) {
    // if item exist, udate the qty
    fetch(`http://localhost:3000/api/carts/${cart[0].id}/cart_products/${product.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        qty: existingCartItem.qty + 1 //increment qty by 1 
      })
    }).then(response => response.json())
      .then(result => {
        alert('You successfully added product to your cart: '+ product.name);
        console.log(result);
      })
      .catch(console.error);
    } else {
      fetch(`http://localhost:3000/api/carts/${cart[0].id}/cart_products/${product.id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          qty: 1
        })
      }).then(response => response.json())
        .then(result => {
          alert('You successfully added product to your cart: '+ product.name);
          console.log(result);
        })
        .catch(console.error);
    }
  }

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
      <button onClick={handleClick}> Add to Cart </button>
      <button onClick={()=> navigate('/')}>Back to Shop</button>
    </ul>
    )}
    </div>
  );
}

export default Details;