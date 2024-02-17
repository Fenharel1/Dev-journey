import { RowItem } from "./RowItem";

export function ListItems({items}) {
  return (
    <>
      <h4>Productos de la factura</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            return (
              <RowItem item={item} key={idx}></RowItem>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
