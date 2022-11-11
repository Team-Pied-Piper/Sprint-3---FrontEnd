import { TablaFilas } from "./TablaFilas";

const TablaProductos = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div>
      <h3 className="listaProductos__titulo">Lista de todos los productos</h3>
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <TablaFilas
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6}>Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { TablaProductos };
