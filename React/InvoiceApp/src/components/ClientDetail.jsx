export function ClientDetail({client}) {
  const {name, lastName, 
    address: {country, city, street, number} } = client
  return (
    <>
      <h3>Datos del cliente</h3>
      <ul className="list-group">
        <li className="list-group-item active">
          {name} {lastName}
        </li>
        <li className="list-group-item">
          {country} / {city}
        </li>
        <li className="list-group-item">
          {street} {number}
        </li>
      </ul>
    </>
  );
}
