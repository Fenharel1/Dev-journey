export async function getProducts(){
  const response = await fetch('http://localhost:8080/api/products');
  const products = await response.json();
  return products;
}

export function calculateTotal(items){
  if(items.length == 0) return 0;
  return items.map(i=>i.product.price * i.quantity).reduce((ac, curr)=>ac+=curr)
}