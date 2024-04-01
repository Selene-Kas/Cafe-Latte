import { Link } from 'react-router-dom'

const Footer = () => {
  return(
    <footer>
      <Link to="/about"> <h3 class="about">About</h3> </Link>
    </footer>
  );
}

export default Footer;