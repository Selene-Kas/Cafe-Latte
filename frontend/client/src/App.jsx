import {  About, Home, Cart, Details, Login, Navbar, Register, Footer, Checkout } from '../pages'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import { useState } from 'react';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <>
    <div>
      <Navbar token={token}/>
     <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login token={token} setToken={setToken}/>}/>
          <Route path="register" element={<Register token={token} setToken={setToken} />}/>
          <Route path="products/:id" element={<Details token={token}/>}/>
          <Route path="cart" element={<Cart token={token} />}/>
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
