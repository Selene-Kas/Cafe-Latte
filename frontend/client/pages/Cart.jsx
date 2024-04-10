import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { fetchCart } from "./api";

const Cart = ({token}) => {
  const [me, setMe] = useState(null);
  const [cart, setCart] = useState('');
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const { id }= useParams();

  useEffect(() => {
    async function fetchMe() {
      const response = await fetch('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: token
        }
      });
      const data = await response.json();
      console.log(data);
      setMe(data);
    }
    fetchMe();
  }, []);

  useEffect(() => {
    async function fetchUserCart() {
      const response = await fetch(`http://localhost:3000/api/carts/user/${me.id}`);
      const [data] =await response.json();
      console.log(data);
      setCart(data);
    }
    if (me) {fetchUserCart();}
    //fetchUserCart();
  }, [me]);

  useEffect(() => {
    const fetchCartProducts = async()=> {
        const response = await fetch(`http://localhost:3000/api/carts/${cart.id}/cart_products`);
        const json = await response.json();
        console.log(json);
        if(response.ok){
          setCartProducts(json);
        }
        else{
          console.log(json);
        }
      };
      if(cart.id){
        fetchCartProducts();
      }
      else {
        setCartProducts([]);
      }
  }, [cart]);

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setMe({});
  }

  return(
    <main>
      <h1>Cart</h1>
      {me &&
      <div>
      <h3>User Id: {me.id}</h3>
      <h2 >Welcome {me.firstname} {me.lastname}!</h2>
      <h3>EMAIL: {me.username}</h3>
      <button className="logout" onClick={()=>{ logout(); navigate('/') }}>Logout: { me.firstname }</button> 
      </div>
      }
      {cart && 
      <div><p>Cart Id: {cart.id} </p></div>
      }
      <div className="productsList">
      {cartProducts.map((product)=> {
        // const cartProduct = cartProducts.find(cartProduct => cartProduct.product_id === product.id);
        return (
          <ul className="productCards" key={product.name}>
            <li className='productName'>{product.name}</li>
            <li>Qty: {product.qty}</li>
            <li> ${product.product_price}</li>
            <li><img src={product.img} alt={product.name} /></li>
          </ul> 
        )
      })}
    </div>
    </main>
  );
}

export default Cart;