
// fetch for a single product
export const fetchSingleProduct = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const [result] = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(`Oh no, trouble fetching product #${productId}!`, err);
  }
};
// fetch cart pertaining to user
export const fetchUserCart= async(userId)=> {
  const response = await fetch(`http://localhost:3000/api/carts/user/${userId}`);
  const data =await response.json();
  console.log(data);
  return(data);
}

// fetch user(me) and token 
export const fetchMe= async(token)=> {
  const response = await fetch('http://localhost:3000/api/auth/me', {
    headers: {
      Authorization: token
    }
  });
  const data = await response.json();
  console.log(data);
  return(data);
}