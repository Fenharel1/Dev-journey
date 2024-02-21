import { RowItem } from "./RowItem";

export function ListItems({items, handlerDelete}) {
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
              <RowItem onDelete={handlerDelete} item={item} key={idx}></RowItem>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
