import { useReducer } from "react";
import { itemsReducer } from "../reducer/itemsReducer";
import { useEffect } from "react";
import { AddProductCart, UpdateProductCart, DeleteProductCart } from "../reducer/itemsAction";
import { useNavigate } from "react-router-dom";

const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [ ];
// const initialCartItems = JSON.parse(localStorage.getItem('cart')) || [ ];

export function useItemsCart(){

  const navigate = useNavigate();

  const [cartItems, dispatch] = useReducer(itemsReducer, initialCartItems)

  const addItemCart = (product) => {
    const hasItem = cartItems.find((i) => i.product.name == product.name);
    if (hasItem) {
      dispatch({type: UpdateProductCart, payload: product})
    } else {
      dispatch({type: AddProductCart, payload: product})
    }
    navigate('/cart')
  };

  const deleteItemCart = (name) => {
    dispatch({type:DeleteProductCart, payload: name})
  };

  useEffect(()=>{
    sessionStorage.setItem('cart', JSON.stringify(cartItems)); 
  }, [cartItems])

  return {
    cartItems,
    addItemCart,
    deleteItemCart
  }
}