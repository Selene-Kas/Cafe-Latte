import { Link } from 'react-router-dom'
import cafe from '../src/assets/cafe.png' 

const Navbar = () => {
  return(
    <nav>
      <h1 className='maintitle'>Café <img id='logo-image' src={cafe}/> Latte</h1>
      <ul>
        <li>
          <Link to="/"> <h3>SHOP</h3> </Link>
        </li>
        <li>
          <Link to="/login"><h3>LOG-IN</h3></Link>
        </li>
        <li>
          <Link to="/register"><h3>CREATE-ACCOUNT</h3></Link>
        </li>
        <li>
          <Link to="/cart"><h3>CART</h3></Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;