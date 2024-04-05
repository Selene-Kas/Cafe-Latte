import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import search from '../src/assets/search.png'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState("");
  const filteredProducts = products.filter( product => 
    product.name.toLowerCase().includes(filterText.toLowerCase()) 
    );
  useEffect(() => {
    async function getAllProducts() {
      try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      console.log('data:',data);
      setProducts(data);
      } catch (error) {
        console.error('Uh oh, trouble fetching products', error);
      }
    }
    getAllProducts();
  }, []);

  const navigate = useNavigate(); 

  return(
    <div>
      <h1>COFFEE</h1>
      <label className="searchInput"> <img id='search-img' src={search}/>
    <input 
      type="text" placeholder="Search a Coffee?" value={filterText}
      onChange={(e) => setFilterText(e.target.value.toLowerCase())}
    /> 
    </label>
      <div className="productsList">
      {filteredProducts.map((product)=> {
        return(
          <div className="productCards" key={product.id}>
            <h3 className='productName'>{product.name}</h3>
            <img src={product.img} alt={product.name} />
            <p>Price: ${product.product_price}</p>
            <button onClick={() => navigate(`products/${product.id}`)}> Product Details </button>
          </div> 
        );
      })}
    </div>
    </div>
  );
}

export default Home;