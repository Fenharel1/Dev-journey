import { useEffect } from "react";
import { calculateTotal } from "../services/productService";
import { useNavigate } from "react-router-dom";

export const CartView = ({ items, handleDelete }) => {

  const navigate = useNavigate();

  const goCatalog = () => {
    navigate('/catalog')
  }

  return (
    <>
      <h3>Carro de compra</h3>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.product.name}</td>
              <td>{item.product.price}</td>
              <td>{item.quantity}</td>
              <td>{Number(item.product.price) * Number(item.quantity)}</td>
              <td>
                <button onClick={e=>handleDelete(item.product.name)}  className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">
              Total
            </td>
            <td colSpan="2" className="text-end fw-bold">
              {calculateTotal(items)}
            </td>
          </tr>
        </tfoot>
      </table>
      <button className="btn btn-success my-3" onClick={goCatalog}>Seguir comprando</button>
    </>
  );
};
