import React from "react";
import deleteImg from "../../img/delete.png";
import editImg from "../../img/edit.png";

const TablaVentasFilas = ({ el }) => {
  //formateador de moneda
  function formatearMoneda(numero) {
    return new Intl.NumberFormat().format(numero);
  }
  //formateador de moneda
  return (
    <tr>
      <td>{el.fecha}</td>
      <td>{el.id}</td>
      <td>{el.cantidad}</td>
      <td>{formatearMoneda(el.valor)}</td>
    </tr>
  );
};

export { TablaVentasFilas };
