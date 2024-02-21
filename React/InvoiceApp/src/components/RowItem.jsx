export function RowItem({ item, onDelete}) {
  return (
    <>
      <tr>
        <td>{item.product}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>
          <button className="btn btn-danger" onClick={e=>onDelete(item.product)}>Eliminar</button>
        </td>
      </tr>
    </>
  );
}
