import { useEffect } from "react";
import { useState } from "react";
import { getProducts } from "../services/productService";
import { CatalogItem } from "./CatalogItem";

export function CatalogView({handleAddItems}) {

  const [products, setProducts] = useState([]);

  useEffect(()=>{
    setProducts(getProducts())
  }, []);

  return (
    <>
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
