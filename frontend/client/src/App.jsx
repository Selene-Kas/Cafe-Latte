import {  About, Home, Cart, Details, Login, Navbar, Register, Footer, Checkout } from '../pages'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import { useState } from 'react';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  //const [cart, setCart] = useState('');
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <>
    <div>
      <Navbar token={token}/>
     <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login token={token} setToken={setToken}/>}/>
          <Route path="register" element={<Register token={token} setToken={setToken} />}/>
          <Route path="products/:id" element={<Details token={token} cartProducts={cartProducts} setCartProducts={setCartProducts}/>}/>
          <Route path="cart" element={<Cart token={token} cartProducts={cartProducts} setCartProducts={setCartProducts} />}/>
          <Route path="about" element={<About />}/>
          <Route path="checkout" element={<Checkout token={token}/>} /> 
        </Routes>
     </main>
     <Footer />
    </div>
    </>
  )
}

export default App;
