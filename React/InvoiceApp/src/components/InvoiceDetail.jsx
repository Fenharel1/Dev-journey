export function InvoiceDetail({ id, name }) {
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item active">Id: {id}</li>
        <li className="list-group-item">Name: {name}</li>
      </ul>
    </>
  );
}
