import { useState, useEffect } from "react";
import "../../styles/Carritop.css";
import iconDelete from "../../img/icon-delete.svg";
import iconMinus from "../../img/icon-minus.svg";
import iconPlus from "../../img/icon-plus.svg";
import carritoVacio from "../../img/carrito-de-compras.png";
import carritoArreglo from "./carritoDb.js";
import { helpHttp } from "../../../helpers/helpHttp";

const Carrito = () => {
  //formateador de moneda
  function formatearMoneda(numero) {
    return new Intl.NumberFormat().format(numero);
  }
  //formateador de moneda

  // Eliminar un producto ------------------------------------------------------------
  const [cart, setCart] = useState(carritoArreglo);
  const eliminarProducto = (productId) => {
    const carroActualizado = cart.filter(
      (producto) => producto.id !== productId
    );
    setCart(carroActualizado);
  };

  const eliminar = (productId) => {
    for (let i = 0; i < carritoArreglo.length; i++) {
      if (carritoArreglo[i].id === productId) {
        carritoArreglo.splice(i, 1);
        eliminarProducto(productId);
        break;
      }
    }
  };
  // Eliminar un producto ------------------------------------------------------------

  // Aumentar cantidad ------------------------------------------------------------
  const [counterPlus, setCounterPlus] = useState(1);
  const aumentarCantidad = (productId) => {
    for (let i = 0; i < carritoArreglo.length; i++) {
      if (carritoArreglo[i].id === productId) {
        if (carritoArreglo[i].stock <= carritoArreglo[i].cantidad) {
          alert("no contamos con mas unidades");
        } else {
          setCounterPlus(counterPlus + 1);
          carritoArreglo[i].cantidad = carritoArreglo[i].cantidad + 1;
          carritoArreglo[i].total =
            carritoArreglo[i].precio * carritoArreglo[i].cantidad;
        }
        break;
      }
    }
  };
  // Aumentar cantidad ------------------------------------------------------------

  // Disminuir cantidad ------------------------------------------------------------
  const [counterMinus, setCounterMinus] = useState(1);
  const disminuirCantidad = (productId) => {
    for (let i = 0; i < carritoArreglo.length; i++) {
      if (carritoArreglo[i].id === productId) {
        if (carritoArreglo[i].cantidad <= 1) {
          eliminar(productId);
        } else {
          setCounterMinus(counterMinus + 1);
          carritoArreglo[i].cantidad = carritoArreglo[i].cantidad - 1;
          carritoArreglo[i].total =
            carritoArreglo[i].precio * carritoArreglo[i].cantidad;
        }

        break;
      }
    }
  };
  // Disminuir cantidad ------------------------------------------------------------

  // Verificar total------------------------------------------------------------
  let [contadorTotal, setContadorTotal] = useState(0);
  contadorTotal = carritoArreglo.reduce(
    (acc, el) => parseInt(acc) + parseInt(el.total),
    0
  );

  // Verificar total------------------------------------------------------------

  // Verificar totalProductos------------------------------------------------------------
  let [contadorProductos, setContadorProductos] = useState(0);
  contadorProductos = carritoArreglo.reduce((acc, el) => acc + el.cantidad, 0);

  // Verificar totalProductos------------------------------------------------------------

  // cancelar compra ------------------------------------------------------------

  const cancelarCompra = () => {
    alert("tu carrito sera eliminado");
    carritoArreglo.splice(0, carritoArreglo.length);
    eliminarProducto();
  };
  // cancelar compra ------------------------------------------------------------

  // realizar compra ------------------------------------------------------------
  let newCompra = {};
  const fechaActual = new Date();
  let fechaVenta = `${fechaActual.getDate()}/${
    fechaActual.getMonth() + 1
  }/${fechaActual.getFullYear()} - ${fechaActual.toLocaleTimeString("es-co")}`;
  const [DbVenta, setDbVenta] = useState(null);
  const api = helpHttp();
  const urlVenta = "http://localhost:5000/ventas";

  //BD VENTA
  useEffect(() => {
    helpHttp()
      .get(urlVenta)
      .then((res) => {
        if (!res.err) {
          setDbVenta(res);
        } else {
          setDbVenta(null);
        }
      });
  }, [urlVenta]);

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(urlVenta, options).then((res) => {
      if (!res.err) {
        setDbVenta([...DbVenta, res]);
      }
    });
  };
  //BD VENTA

  //BD PRODUCTOS
  const [DbProductos, setDbProductos] = useState([]);
  const urlProductos = "http://localhost:5000/productos";
  useEffect(() => {
    helpHttp()
      .get(urlProductos)
      .then((res) => {
        if (!res.err) {
          setDbProductos(res);
        } else {
          setDbProductos(null);
        }
      });
  }, [urlProductos]);

  const updateData = (data) => {
    let edpoint = `${urlProductos}/${data.id}`;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(edpoint, options).then((res) => {
      if (!res.err) {
        let newData = DbProductos.map((el) => (el.id === data.id ? data : el));
        setDbProductos([...DbProductos, res]);
        setDbProductos(newData);
      }
    });
  };
  let descontarStock = () => {
    for (let iProduct = 0; iProduct < DbProductos.length; iProduct++) {
      for (let iCard = 0; iCard < carritoArreglo.length; iCard++) {
        if (DbProductos[iProduct].id == carritoArreglo[iCard].id) {
          const newDataProduct = { ...DbProductos[iProduct] };
          newDataProduct.stock -= carritoArreglo[iCard].cantidad;
          updateData(newDataProduct);
        }
      }
    }
  };

  //BD PRODUCTOS

  const finalizarCompra = () => {
    newCompra = {
      id: "",
      fecha: fechaVenta,
      cantidad: contadorProductos,
      valor: contadorTotal,
    };
    createData(newCompra);
    descontarStock();
    alert(
      `¡GRACIAS POR TU COMPRA! \n Total productos: ${contadorProductos} \n Total a pagar: ${formatearMoneda(
        contadorTotal
      )}`
    );
    carritoArreglo.splice(0, carritoArreglo.length);
    eliminarProducto();
  };

  // realizar compra ------------------------------------------------------------

  // verifica si carrito esta vacio ----------------------------------------------------------
  if (carritoArreglo.length > 0) {
    return (
      <section className="section, section__carrito">
        <div className="section__titulo-container">
          <h1 className="section__titulo">Tus productos</h1>
        </div>
        <div className="carrito__contenedor">
          <div className="carrito__contenedor-izquierda">
            <div className="carrito__compras-titulo-contenedor">
              <h3 className="carrito__compras-titulo-imagen">Imagen</h3>
              <h3 className="carrito__compras-titulo-cantidad">Cantidad</h3>
              <h3 className="carrito__compras-titulo-producto">Producto</h3>
              <h3 className="carrito__compras-titulo-valor">Valor</h3>
              <h3 className="carrito__compras-titulo-total">Total</h3>
            </div>

            {/* productos carrito */}
            {cart.map((product) => (
              <div className="producto-carrito__contenedor" key={product.id}>
                <div className="producto-carrito__contenedor-item">
                  <img
                    src={product.img}
                    alt="imagen producto"
                    className="producto-carrito__imagen"
                  />
                </div>
                <div className="producto-carrito__contenedor-item">
                  <div className="producto-carrito__cantidad-input-contenedor">
                    <img
                      src={iconMinus}
                      alt="icono menos"
                      onClick={() => disminuirCantidad(product.id)}
                    />
                    <p>{product.cantidad}</p>
                    <img
                      src={iconPlus}
                      alt="icono mas"
                      onClick={() => aumentarCantidad(product.id)}
                    />
                  </div>
                  <div className="productCard__table-delete">
                    <img
                      src={iconDelete}
                      alt="icono eliminar"
                      onClick={() => eliminar(product.id)}
                    />
                  </div>
                </div>
                <div className="producto-carrito__contenedor-item">
                  <p className="productCard__table-producto">
                    {product.nombre}
                  </p>
                </div>
                <div className="producto-carrito__contenedor-item">
                  <p className="productCard__table-vu">
                    ${formatearMoneda(product.precio)}
                  </p>
                </div>
                <div className="producto-carrito__contenedor-item">
                  <p className="productCard__table-vt">
                    ${formatearMoneda(product.precio * product.cantidad)}
                  </p>
                </div>
              </div>
            ))}
            {/* productos carrito */}
          </div>
          <div className="carrito__contenedor-derecha">
            <h2 className="carrito__subtitulos">Detalle de compra</h2>
            <p className="carrito__total">
              Total a pagar: ${" "}
              <span className="carrito__costo">
                {formatearMoneda(contadorTotal)}
              </span>
            </p>
            <p className="carrito__total-productos">
              Cantidad de productos: {contadorProductos}
            </p>
            <div className="carrito__conenedor-btn">
              <button
                className="carrito__btn-finalizar-compra"
                onClick={() => finalizarCompra()}
              >
                Finalizar Compra
              </button>
              <button
                className="carrito__btn-cancelar"
                onClick={cancelarCompra}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="section__carrito">
        <div className="section__titulo-container">
          <h1 className="section__titulo">Tus productos</h1>
        </div>
        <div className="container__carrito-vacio">
          <img src={carritoVacio} alt="imagen carrito" />
          <p>Tu carrito está vacío, agrega tu primer producto 😎</p>
        </div>
      </section>
    );
  }
};

export { Carrito };
