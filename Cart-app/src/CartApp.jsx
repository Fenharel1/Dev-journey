import { Navbar } from "./components/Navbar";
import { CartRoutes } from "./routes/CartRoutes";

export const CartApp = () => {

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <CartRoutes></CartRoutes> 
      </div>
    </>
  );
};
