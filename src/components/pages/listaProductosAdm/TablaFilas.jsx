import React from "react";
import deleteImg from "../../img/delete.png";
import editImg from "../../img/edit.png";

const TablaFilas = ({ el, setDataToEdit, deleteData }) => {
  let { nombre, precio, stock, id } = el;
  //formateador de moneda
  function formatearMoneda(numero) {
    return new Intl.NumberFormat().format(numero);
  }
  //formateador de moneda

  return (
    <tr>
      <td>
        <img
          src={el.img}
          alt="imagen"
          className="listaProductos__img-producto"
        />
      </td>
      <td>{nombre}</td>
      <td>${formatearMoneda(precio)}</td>
      <td>{stock}</td>
      <td>
        <img
          src={editImg}
          alt="icono editar"
          onClick={() => setDataToEdit(el)}
          className="listaProductos__icono"
        />
        <img
          src={deleteImg}
          alt="icono eliminar"
          onClick={() => deleteData(id)}
          className="listaProductos__icono"
        />
      </td>
    </tr>
  );
};

export { TablaFilas };
