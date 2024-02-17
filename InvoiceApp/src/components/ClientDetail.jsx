export function ClientDetail({client}) {
  const {nameClient, lastName, address} = client
  const { country, city, street, number } = address;
  return (
    <>
      <h3>Datos del cliente</h3>
      <ul className="list-group">
        <li className="list-group-item active">
          {nameClient} {lastName}
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
