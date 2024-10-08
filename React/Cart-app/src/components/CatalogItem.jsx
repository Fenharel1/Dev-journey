export const CatalogItem = ({name, description, price, onAddBtn}) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">$ {price}</p>
          <button onClick={e=>onAddBtn({name, description, price})} className="btn btn-primary">Agregar al carro</button>
        </div>
      </div>
    </>
  );
};
