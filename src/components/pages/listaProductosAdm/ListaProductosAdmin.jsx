import React, { useState, useEffect } from "react";
import { FormProduct } from "./FormProduct";
import { TablaProductos } from "./TablaProductos";
import { helpHttp } from "../../../helpers/helpHttp";
import { Loader } from "../loader/Loader";
import { Message } from "../loader/Message";
import "../../styles/ListaProductosAdm.css";

const ListaProductosAdmin = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);

  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  //Datos del api - llamado a archivo helper que ayuda a consumir api y sus verbos
  let api = helpHttp();
  let url = "http://localhost:5000/productos";

  useEffect(() => {
    setloading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        // console.log(res);
        if (!res.err) {
          setDb(res); // guardando datos de la api en arreglo "useState"
          seterror(null);
        } else {
          setDb(null); //en caso de que no traiga datos
          seterror(res);
        }
        setloading(false);
      });
  }, [url]);

  // Crear nuevo producto en DB ---------------------------------------------
  const createData = (data) => {
    data.id = Date.now();

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      if (!res.err) {
        setDb([...db, res]);
      } else {
        seterror(res);
      }
    });
  };
  // Crear nuevo producto en DB ---------------------------------------------

  // Actualizar producto en DB ---------------------------------------------
  const updateData = (data) => {
    let edpoint = `${url}/${data.id}`;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(edpoint, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb([...db, res]);
        setDb(newData);
      } else {
        seterror(res);
      }
    });
  };
  // Actualizar producto en DB ---------------------------------------------

  // Eliminar producto en DB ---------------------------------------------
  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estas seguro de eliminar el registro con id "${id}"`
    );
    if (isDelete) {
      let edpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(edpoint, options).then((res) => {
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          seterror(res);
        }
      });
    } else {
      return;
    }
  };
  // Eliminar producto en DB ---------------------------------------------

  return (
    <section className="section">
      <div className="section__titulo-container">
        <h1 className="section__titulo">Lista de productos</h1>
      </div>
      <div className="listaProductos__contenedor">
        <div className="listaProductos__tabla">
          {loading && <Loader />}
          {error && (
            <Message
              msg={`Error ${error.status}: ${error.statusText}`}
              bgColor="#dc3545"
            />
          )}
          {db && (
            <TablaProductos
              data={db}
              setDataToEdit={setDataToEdit}
              deleteData={deleteData}
            />
          )}
        </div>
        <div className="listaProductos__formulario">
          <FormProduct
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
        </div>
      </div>
    </section>
  );
};

export { ListaProductosAdmin };
