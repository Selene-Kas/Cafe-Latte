import { Link } from 'react-router-dom'

const Footer = () => {
  return(
    <footer>
      <ul>
        <li>
          <Link to="/about"> <h3>About</h3> </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;