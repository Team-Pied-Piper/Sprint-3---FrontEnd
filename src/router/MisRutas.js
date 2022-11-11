import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Carrito } from "../components/pages/carrito/Carrito";
import { Footer } from "../components/layout/Footer";
import { HeaderNav } from "../components/layout/HeaderNav";
import { ListaProductos } from "../components/pages/listaProductos/ListaProductos";
import { ListaProductosAdmin } from "../components/pages/listaProductosAdm/ListaProductosAdmin";
import { ListaVentasAdmin } from "../components/pages/listaVentasAdm/ListaVentasAdmin";

const MisRutas = () => {
  return (
    <BrowserRouter>
      {/* HEADER Y NAVEGACION */}
      <HeaderNav />
      {/* CONTENIDO CENTRAL */}

      <section className="contenido">
        <Routes>
          <Route path="/" element={<ListaProductos />} />
          <Route path="/inicio" element={<ListaProductos />} />
          <Route path="/lista-productos" element={<ListaProductos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route
            path="/lista-productos-admin"
            element={<ListaProductosAdmin />}
          />
          <Route path="/lista-ventas-admin" element={<ListaVentasAdmin />} />
        </Routes>
      </section>

      {/* FOOTER */}
      <Footer />
    </BrowserRouter>
  );
};

export { MisRutas };
