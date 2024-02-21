import { useEffect } from "react";
import { useState } from "react";
import { getProducts } from "../services/productService";
import { CatalogItem } from "./CatalogItem";

export function CatalogView({handleAddItems}) {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = async () => {
    const prods = await getProducts();
    setProducts(prods)
    setIsLoading(false); 
  }

  useEffect(()=>{
    loadProducts();
  }, []);

  return (
    <>
      {
        isLoading && <div className="alert alert-info">Cargando...</div>
      }
      <div className="row">
        {products.map((p, idx) => (
          <div key={idx} className="col-4 my-2">
            <CatalogItem onAddBtn={handleAddItems} name={p.name} description={p.description} price={p.price} ></CatalogItem>
          </div>
        ))}
      </div>
    </>
  );
}
