import { CartView } from "./components/CartView";
import { CatalogView } from "./components/CatalogView";

export const CartApp = () => {

  return (
    <>
      <div className="container">
        <h3>Cart App</h3> 
        <CatalogView></CatalogView>

        <div className="my-4 w-50">
          <CartView></CartView> 
        </div>
      </div>
    </>
  )
}