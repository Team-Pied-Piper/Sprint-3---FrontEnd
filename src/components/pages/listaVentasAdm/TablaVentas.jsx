import { TablaVentasFilas } from "./TablaVentasFilas";

const TablaVentas = ({ data }) => {
  return (
    <div>
      <h3>Tabla de ventas</h3>
      <table>
        <thead>
          <tr>
            <th>Mes/Dia/Año - Hora</th>
            <th>ID Venta</th>
            <th>Cantidad Productos</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          ) : (
            data.map((el) => <TablaVentasFilas key={el.id} el={el} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export { TablaVentas };
