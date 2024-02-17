import { getInvoice } from "../services/invoiceService";
import { ClientDetail } from "./ClientDetail";
import { CompanyDetail } from "./CompanyDetail";
import { InvoiceDetail } from "./InvoiceDetail";
import { ListItems } from "./ListItems";

export function InvoiceApp() {
  const { id, name, client, company, items } = getInvoice();

  return (
    <>
      <div className="container my-4">
        <div className="card">
          <div className="card-header">Ejemplo factura</div>
          <div className="card-body">
            <InvoiceDetail id={id} name={name}></InvoiceDetail>
            <div className="row my-4">
              <div className="col">
                <ClientDetail client={client} ></ClientDetail>
              </div>
              <div className="col">
                <CompanyDetail company={company}></CompanyDetail>
              </div>
            </div>
            <ListItems items={items}></ListItems>
          </div>
        </div>
      </div>
    </>
  );
}
