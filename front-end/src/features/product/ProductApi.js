// front-endvite/src/features/product/ProductApi.js 
export async function createProduct(product) {
  const response = await fetch("http://localhost:8080/products/",{method:"POST",body:JSON.stringify(product),headers:{"content-type":"application/json"}})
  const data = await response.json();
  return data;
}

export async function fetchProduct(sort,filters) {
  let queryString="";
  //Query Building for the filter
  for(let key in filters){
    if(filters[key].length){
    queryString+=`${key}=${filters[key]}&`
  }
  }
  //Query Building for the Sort
  for(let key in sort){
  queryString += `${key}=${sort[key]}&`
  } 

  const response = await fetch(
    "http://localhost:8080/products?"+queryString
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