import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { fetchCart } from "./api";
//import { setProducts } from "./Home";

const Cart = ({token, cart, setCart}) => {
  const [me, setMe] = useState(null);
  //const [cart, setCart] = useState('');
  const [cartProducts, setCartProducts] = useState([]);
  const [price, setPrice] = useState();
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
    location.reload(navigate('/login'));
  }

  const handlePrice = () => {
    let ans = 0;
    cartProducts.map((product)=>(
      ans += product.qty * product.product_price
    ))
    setPrice(ans);
    console.log(ans);
  }

  const handleChange = (product, d) => {
    let amount = -1;
    cartProducts.forEach((data, index)=> {
      if (data.id === product.id)
        amount = index;
      console.log(product)
    });
    const tempArr = cartProducts;
    tempArr[amount].qty += d;
    if(tempArr[amount].qty === 0)
      tempArr[amount].qty = 1;
    setCartProducts([...tempArr])
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
    })//.then(response => response.json())
    .then(result => {
      alert('You successfully removed item from cart: ' + product.name );
      location.reload();
      console.log(result);
      return(result);
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
      <button className="logout" onClick={()=>{ logout() }}>Logout: { me.firstname }</button> 
      </div>
      }
      {/* {cart && 
      <div><p>Cart Id: {cart.id} </p></div>
      } */}
      <div className="productsList">
      {cartProducts.length > 0 ? (
      cartProducts.map((product)=> {
        // const cartProduct = cartProducts.find(cartProduct => cartProduct.product_id === product.id);
        return (
          <div className="productCards" key={product.product_id}>
            {/* <li>ID: {product.product_id}</li> */}
            <h3 className='productName'>{product.name}</h3>
            <p>{product.product_id}</p>
            <div className="qtybuttons" >
              <button className="add" onClick={()=>handleChange(product, +1)}>+</button>
              <button className="itemQty">{product.qty}</button>
              <button className="subtract" onClick={()=>handleChange(product, -1)}>-</button>
            </div>
            <img src={product.img} alt={product.name} />
            <div>
            <span> ${product.product_price}</span>
              <button onClick={()=>handleRemove(product)}>Remove</button>
            </div>
          </div> 
        )
      })
    ): (
    <h3>No items in your CART! </h3>
    )}
    </div>
    <div className="total">
      <h3>SubTotal of your Cart $ {price}</h3>
      <button className="checkout">Checkout</button>
    </div>
    </main>
  );
}

export default Cart;
