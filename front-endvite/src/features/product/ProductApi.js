// front-endvite/src/features/product/ProductApi.js 
export async function fetchProduct() {
  const response = await fetch(
    "http://localhost:8080/products"
  );
  const data = await response.json();
  return data; // ARRAY of products
}

export async function fetchColors() {
  const response = await fetch('http://localhost:8080/colors/')
  const data = await response.json();
  return data;
}

export async function fetchCategory( ) {
  const response = await fetch('http://localhost:8080/categories/')
  const data = await response.json()
  return data;
}
export async function fetchSizes( ) {
  const response = await fetch('http://localhost:8080/sizes/')
  const data = await response.json()
  return data;
}