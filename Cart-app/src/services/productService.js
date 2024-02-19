import { products } from "../data/products";

export function getProducts(){
  return products;
}

export function calculateTotal(items){
  if(items.length == 0) return 0;
  return items.map(i=>i.product.price * i.quantity).reduce((ac, curr)=>ac+=curr)
}