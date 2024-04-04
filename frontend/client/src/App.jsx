import {  About, Home, Cart, Details, Login, Navbar, Register, Footer, Checkout } from '../pages'
import './App.css'
import { Routes, Route} from 'react-router-dom'


function App() {

  return (
    <>
    <div>
      <Navbar />
     <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="products/:id" element={<Details />}/>
          <Route path="cart" element={<Cart />}/>
          <Route path="about" element={<About />}/>
          <Route path="checkout" element={<Checkout />} />
        </Routes>
     </main>
     <Footer />
    </div>
    </>
  )
}

export default App;
