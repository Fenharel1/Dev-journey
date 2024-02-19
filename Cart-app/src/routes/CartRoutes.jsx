import { Navigate, Route, Routes } from "react-router-dom";
import { CartView } from "../components/CartView";
import { CatalogView } from "../components/CatalogView";
import { useItemsCart } from "../hooks/useItemsCart";

export function CartRoutes() {
  const { cartItems, addItemCart, deleteItemCart } = useItemsCart();
  return (
    <Routes>
      <Route
        path="catalog"
        element={<CatalogView handleAddItems={addItemCart}></CatalogView>}
      ></Route>
      <Route
        path="cart"
        element={
          cartItems?.length == 0 ? (
            <div className="alert alert-warning">
              No hay productos en el carrito de compras
            </div>
          ) : (
            <div className="my-4 w-50">
              <CartView
                handleDelete={deleteItemCart}
                items={cartItems}
              ></CartView>
            </div>
          )
        }
      ></Route>
      <Route path="/" element={<Navigate to={"/catalog"}></Navigate>}></Route>
    </Routes>
  );
}
