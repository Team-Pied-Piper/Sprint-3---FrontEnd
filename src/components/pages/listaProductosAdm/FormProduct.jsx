import React, { useState, useEffect } from "react";

const initialForm = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  img: "",
  id: null,
};
const FormProduct = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.nombre ||
      !form.descripcion ||
      !form.precio ||
      !form.stock ||
      !form.img
    ) {
      alert("Por favor completa todos los datos");
      return;
    }
    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3 className="listaProductos__titulo">
        {dataToEdit ? "Editar producto seleccionado" : "Agregar nuevo producto"}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="listaProductos__contenedor-formulario"
      >
        <div className="listaProductos__contenedor-inputs">
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            value={form.nombre}
          />
        </div>
        <div className="listaProductos__contenedor-inputs">
          <label htmlFor="descripcion">Descripcion: </label>
          <textarea
            name="descripcion"
            onChange={handleChange}
            value={form.descripcion}
            placeholder="Descripcion"
          ></textarea>
        </div>
        <div className="listaProductos__contenedor-inputs">
          <label htmlFor="precio">Precio: </label>
          <input
            type="text"
            name="precio"
            placeholder="Precio"
            onChange={handleChange}
            value={form.precio}
          />
        </div>
        <div className="listaProductos__contenedor-inputs">
          <label htmlFor="stock">Stock: </label>
          <input
            type="text"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            value={form.stock}
          />
        </div>
        <div className="listaProductos__contenedor-inputs">
          <label htmlFor="img">URL Imagen: </label>
          <input
            type="text"
            name="img"
            placeholder="URL Imagen"
            onChange={handleChange}
            value={form.img}
          />
        </div>
        <div className="listaProductos__contenedor-btn">
          <input
            type="submit"
            value="Guardar"
            className="listaProductos__btn-guardar"
          />
          <input
            type="reset"
            value="Limpiar"
            onClick={handleReset}
            className="listaProductos__btn-limpiar"
          />
        </div>
      </form>
    </div>
  );
};

export { FormProduct };
