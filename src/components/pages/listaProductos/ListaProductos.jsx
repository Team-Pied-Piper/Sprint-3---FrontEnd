import React, { useState, useEffect } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import { Loader } from "../loader/Loader";
import { Message } from "../loader/Message";
import carritoDb from "../carrito/carritoDb.js";
import "../../styles/ListaPoductos.css";
import "../../styles/Product.css";

const ListaProductos = ({ setContadorProductos, CuentaProductos }) => {
  const [Db, setDb] = useState(null); //useState para traer API
  const [Error, setError] = useState(null); //useState para errores de API
  const [Loading, setLoading] = useState(false); //useState para loading de API
  CuentaProductos = 11;
  //Datos del api - llamado a archivo helper que ayuda a consumir API
  let api = helpHttp();
  let url = "http://localhost:5000/productos";
  //Datos del api - llamado a archivo helper que ayuda a consumir API

  //useEffect para GET de API - LOADER - Y ERRORES
  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      // console.log(res);
      if (!res.err) {
        setDb(res); // guardando datos de la api en arreglo "useState"
        setError(null);
      } else {
        setDb(null); //en caso de que no traiga datos
        setError(res);
      }
      setLoading(false);
    });
  }, [url]);
  //useEffect para GET de API - LOADER - Y ERRORES

  //formateador de moneda
  function formatearMoneda(numero) {
    return new Intl.NumberFormat().format(numero);
  }
  //formateador de moneda

  //funcionalidad agregar a carrito ---------------------------
  const [DbCarrito, setDbCarrito] = useState(carritoDb); //useState para traer array carrito

  //verificar si producto existe en carrito
  let existe = false;
  let existeEnCarro = (itemId) => {
    if (DbCarrito.length > 0) {
      if (DbCarrito.find((item) => itemId === item.id)) {
        existe = true;
      } else {
        existe = false;
      }
    } else {
      existe = false;
    }
  };
  //verificar si producto existe en carrito

  //agregar a carrito
  let agreagarCarrito = (itemId) => {
    existeEnCarro(itemId);
    if (existe) {
      alert("este producto ya esta en tu carrito");
    } else {
      for (let i = 0; i < Db.length; i++) {
        if (Db[i].id === itemId) {
          setContadorProductos = { setContadorProductos };
          carritoDb.push({
            id: Db[i].id,
            img: Db[i].img,
            cantidad: 1,
            nombre: Db[i].nombre,
            precio: Db[i].precio,
            stock: Db[i].stock,
            total: Db[i].precio,
          });
          break;
        }
      }
    }
  };
  //agregar a carrito

  return (
    <section className="section">
      <div className="section__titulo-container">
        <h1 className="section__titulo">Nuestros Productos</h1>
      </div>
      <div className="section__container-productos">
        {Loading && <Loader />}
        {Error && (
          <Message
            msg={`Error ${Error.status}: ${Error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {Db &&
          Db.map((item) => (
            <div className="product" key={item.id}>
              <img className="product__img" src={item.img} alt="producto" />
              <h2 className="product__name">{item.nombre}</h2>
              <div className="product__details">
                <p className="product__price">
                  $
                  <span className="product__price-cost">
                    {formatearMoneda(item.precio)}
                  </span>
                </p>
                <p className="product__stock">
                  Stock:{" "}
                  <span className="product__stock-count">{item.stock}</span>
                </p>
                <button
                  className={item.stock > 0 ? "AddCartBtn" : "NoDisponibleBtn"}
                  onClick={
                    item.stock > 0
                      ? () => agreagarCarrito(item.id)
                      : () =>
                          alert(
                            "Lo sentimos en el momento no contamos con este producto. pero pronto lo traeremos de nuevo!"
                          )
                  }
                >
                  {item.stock > 0 ? "Agragar" : "No Disponible 😢"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export { ListaProductos };
