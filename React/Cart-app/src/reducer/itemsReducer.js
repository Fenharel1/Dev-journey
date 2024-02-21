import { AddProductCart, DeleteProductCart, UpdateProductCart } from "./itemsAction";

export const itemsReducer = (state, action) => {
  switch(action.type){
    case AddProductCart:
      return [
        ...state,
        {
          product: action.payload,
          quantity: 1
        }
      ];
    case UpdateProductCart:
      return state.map(i=>{
        if(i.product.name == action.payload.name){
           return {...i,quantity: i.quantity + 1}
        }
        return i
      });
    case DeleteProductCart:
      return state.filter((i)=>i.product.name != action.payload);
    default:
      return state;
  }
}