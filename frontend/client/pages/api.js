
  // fetch for a single product
export const fetchSingleProduct = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(`Oh no, trouble fetching product #${productId}!`, err);
  }
};