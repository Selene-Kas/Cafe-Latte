
import { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getAllProducts() {
      try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      //console.log('data:',data);
      setProducts(data);
      } catch (error) {
        console.error('Uh oh, trouble fetching products', error);
      }
    }
    getAllProducts();
  }, []);
  return(
    <div>
      <h1>COFFEE</h1>
      <div className="productsList">
      {products.map((product)=> {
        return(
          <div className="productCard" key={product.id}>
            <h3 className='productName'>{product.name}</h3>
            <img src={product.img} alt={product.name} />
            <p>Price: ${product.product_price}</p>
            <button> Product Details </button>
          </div> 
        );
      })}
    </div>
    </div>
  );
}

export default Home;