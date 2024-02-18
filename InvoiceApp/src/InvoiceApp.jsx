import { computeTotal, getInvoice } from "./services/invoiceService";
import { ClientDetail } from "./components/ClientDetail";
import { CompanyDetail } from "./components/CompanyDetail";
import { InvoiceDetail } from "./components/InvoiceDetail";
import { ListItems } from "./components/ListItems";
import { TotalView } from "./components/TotalView";
import { useEffect, useState } from "react";

const invoiceInital = {
  id: 0,
  name: "",
  client: {
    name: "",
    lastName: "",
    address: {
      country: "",
      city: "",
      street: "",
      number: 0,
    },
  },
  company: {
    name: "",
    fiscalNumber: 0,
  },
  items: [],
};

export function InvoiceApp() {
  const [invoice, setInvoice] = useState(invoiceInital);

  const {
    id,
    name,
    client,
    company,
  } = invoice;
  const [items, setItems] = useState([]);
  const [invoiceForm, setInvoiceForm] = useState({
    productValue: "",
    priceValue: 0,
    quantityValue: 0,
  });
  const [total, setTotal] = useState(0);
  const { productValue, priceValue, quantityValue } = invoiceForm;

  useEffect(() => {
    const data = getInvoice();
    setInvoice(data);
    setItems(data.items);
  }, []);

  useEffect(()=>{
    console.log('los items cambiaron')
  }, [invoiceForm])

  useEffect(()=>{
    console.log('computing total')
    console.log(computeTotal(items))
    setTotal(computeTotal(items))
  }, [items])

  const onChange = ({ target: { value, name } }) => {
    setInvoiceForm({
      ...invoiceForm,
      [name + "Value"]: value,
    });
  };

  const onInvoiceSubmit = (e) => {
    e.preventDefault();
    setItems([
      ...items,
      { product: productValue, price: priceValue, quantity: quantityValue },
    ]);
    setInvoiceForm({
      productValue: "",
      priceValue: 0,
      quantityValue: 0,
    });
    console.log(items);
  };

  return (
    <>
      <div className="container my-4">
        <div className="card">
          <div className="card-header">Ejemplo factura</div>
          <div className="card-body">
            <InvoiceDetail id={id} name={name}></InvoiceDetail>
            <div className="row my-4">
              <div className="col">
                <ClientDetail client={client}></ClientDetail>
              </div>
              <div className="col">
                <CompanyDetail company={company}></CompanyDetail>
              </div>
            </div>
            <ListItems items={items}></ListItems>
            <TotalView total={total}></TotalView>

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
          </div>
        </div>
      </div>
    </>
  );
}
