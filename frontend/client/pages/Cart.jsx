import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { fetchCart } from "./api";
//import { setProducts } from "./Home";

const Cart = ({token}) => {
  const [me, setMe] = useState(null);
  const [cart, setCart] = useState('');
  const [cartProducts, setCartProducts] = useState([]);
  const [price, setPrice] = useState(0);
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

  const handlePrice = () => {
    let ans = 0;
    cartProducts.map((product)=>(
      ans += product.qty * product.product_price
    ))
    setPrice(ans);
  }

  useEffect(()=> {
    handlePrice();
  })

  const handleRemove = (product)=> {
    try {
    fetch(`http://localhost:3000/api/carts/${cart.id}/cart_products/${product.product_id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'appliction/json'
      },
    }).then(response => response.json())
    .then(result => {
      alert('You successfully removed item from cart: ' + product.name );
      console.log(result);
      return(result.deletedCartProducts);
    })
    .catch(console.error);
  } catch(err) {
    console.error('oh no trouble removing item', err);
  }
  }

  return(
    <main>
      <h1>Cart</h1>
      {me &&
      <div>
      <h2 >Welcome {me.firstname}!</h2>
      <button className="logout" onClick={()=>{ logout(); navigate('/') }}>Logout: { me.firstname }</button> 
      </div>
      }
      {/* {cart && 
      <div><p>Cart Id: {cart.id} </p></div>
      } */}
      <div className="productsList">
      {cartProducts.map((product)=> {
        // const cartProduct = cartProducts.find(cartProduct => cartProduct.product_id === product.id);
        return (
          <ul className="productCards" key={product.name}>
            <li>ID: {product.product_id}</li>
            <li className='productName'><h3>{product.name}</h3></li>
            <li>
              <button>+</button> 
              <button>Qty: {product.qty}</button>
              <button>-</button>
            </li>
            <li><img src={product.img} alt={product.name} /></li>
            <li>
            <span> ${product.product_price}</span>
              <button onClick={()=>handleRemove(product)}>Remove</button>
            </li>
          </ul> 
        )
      })}
    </div>
    <div className="total">
      <span>Total Price of your Cart</span>
      <span> Rs -</span>
    </div>
    </main>
  );
}

export default Cart;