import { TablaVentas } from "./TablaVentas";
import { useState, useEffect } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import { Loader } from "../loader/Loader";
import { Message } from "../loader/Message";

const ListaVentasAdmin = () => {
  const [Db, setDb] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  let api = helpHttp();
  let url = "http://localhost:5000/ventas";

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

  return (
    <div className="section__titulo-container">
      <h1 className="section__titulo">Lista de ventas</h1>
      {loading && <Loader />}
      {error && (
        <Message
          msg={`Error ${error.status}: ${error.statusText}`}
          bgColor="#dc3545"
        />
      )}
      {Db && <TablaVentas data={Db} />}
    </div>
  );
};

export { ListaVentasAdmin };
