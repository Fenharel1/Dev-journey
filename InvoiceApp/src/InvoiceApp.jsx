import { computeTotal, getInvoice } from "./services/invoiceService";
import { ClientDetail } from "./components/ClientDetail";
import { CompanyDetail } from "./components/CompanyDetail";
import { InvoiceDetail } from "./components/InvoiceDetail";
import { ListItems } from "./components/ListItems";
import { TotalView } from "./components/TotalView";
import { useEffect, useState } from "react";
import { FormItems } from "./components/FormItems";

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
  
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = getInvoice();
    setInvoice(data);
    setItems(data.items);
  }, []);

  useEffect(()=>{
    setTotal(computeTotal(items))
  }, [items])

  const addItems = ({productValue, priceValue, quantityValue}) => {
    setItems([
      ...items,
      { product: productValue, price: priceValue, quantity: quantityValue },
    ]);
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
            <FormItems handler={addItems} ></FormItems>
          </div>
        </div>
      </div>
    </>
  );
}
