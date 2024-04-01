import { Link } from 'react-router-dom'

const Navbar = () => {
  return(
    <nav>
      <h1 className='maintitle'>Café Latte</h1>
      <ul>
        <li>
          <Link to="/"> <h3>Home</h3> </Link>
        </li>
        <li>
          <Link to="/details"><h3>Details</h3></Link>
        </li>
        <li>
          <Link to="/login"><h3>Log-In</h3></Link>
        </li>
        <li>
          <Link to="/register"><h3>Create-Account</h3></Link>
        </li>
        <li>
          <Link to="/cart"><h3>Cart</h3></Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;