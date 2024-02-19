import { useState } from "react";
import { CartView } from "./components/CartView";
import { CatalogView } from "./components/CatalogView";

const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [ ];
// const initialCartItems = JSON.parse(localStorage.getItem('cart')) || [ ];

export const CartApp = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const addItemCart = (product) => {
    const hasItem = cartItems.find((i) => i.product.name == product.name);
    if (hasItem) {
      setCartItems(
        cartItems.map((ci) => {
          if (ci.product.name == product.name) {
            ci.quantity += 1;
          }
          return ci;
        })
      );
    } else {
      setCartItems([...cartItems, { product, quantity: 1, total: 0 }]);
    }
  };

  const deleteItemCart = (name) => {
    setCartItems([...cartItems.filter((i) => i.product.name != name)]);
  };

  return (
    <>
      <div className="container">
        <h1 className="my-4">Cart App</h1>
        <CatalogView handleAddItems={addItemCart}></CatalogView>

        {/* {cartItems?.length == 0 || (
          <div className="my-4 w-50">
            <CartView
              handleDelete={deleteItemCart}
              items={cartItems}
            ></CartView>
          </div>
        )} */}
        <div className="my-4 w-50" style={ { display:  cartItems.length > 0 ? 'block':'none'} } >
          <CartView
            handleDelete={deleteItemCart}
            items={cartItems}
          ></CartView>
        </div>
      </div>
    </>
  );
};
