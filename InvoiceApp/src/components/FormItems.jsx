import { useState } from "react";

export function FormItems({handler}) {
  
  const [invoiceForm, setInvoiceForm] = useState({
    productValue: "",
    priceValue: 0,
    quantityValue: 0,
  });

  const { productValue, priceValue, quantityValue } = invoiceForm;

  const onInvoiceSubmit = (e) => {
    e.preventDefault();
    handler(invoiceForm) 
    setInvoiceForm({
      productValue: "",
      priceValue: 0,
      quantityValue: 0,
    });
  };
  
  const onChange = ({ target: { value, name } }) => {
    setInvoiceForm({
      ...invoiceForm,
      [name + "Value"]: value,
    });
  };

  return (
    <>
      <form className="w-50" onSubmit={onInvoiceSubmit}>
        <label htmlFor="product">Producto: </label>
        <input
          className="form-control my-2"
          type="text"
          name="product"
          placeholder="producto"
          value={productValue}
          onChange={onChange}
        />
        <label htmlFor="price">Precio: </label>
        <input
          className="form-control mb-2"
          type="text"
          name="price"
          placeholder="precio"
          value={priceValue}
          onChange={onChange}
        />
        <label htmlFor="quantity">Cantidad: </label>
        <input
          className="form-control"
          type="text"
          name="quantity"
          placeholder="cantidad"
          value={quantityValue}
          onChange={onChange}
        />
        <button className="mt-4 btn btn-primary" type="submit">
          Agregar
        </button>
      </form>
    </>
  );
}
