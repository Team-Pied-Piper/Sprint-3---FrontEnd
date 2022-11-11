import { NavLink } from "react-router-dom";
import "../styles/HeaderNav.css";
import logo from "../img/logo-pied-horizontal.png";
import iconCard from "../img/icon-cart.svg";
import { Carrito } from "../pages/carrito/Carrito";

const HeaderNav = () => {
  return (
    <header className="header">
      <div className="header__izquierda">
        <NavLink to={"/lista-productos"}>
          <img src={logo} alt="logo" className="header__logo" />
        </NavLink>
        <nav className="header__nav">
          <ul className="header__nav-ul">
            <li>
              <NavLink
                to={"/lista-productos"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Lista De Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/carrito"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Carrito
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/lista-productos-admin"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Lista productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/lista-ventas-admin"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                ventas
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__derecha">
        <div className="header__carrito-conetenedor">
          <NavLink to={"/carrito"}>
            {/* <p className="header__carrito-cuenta">{0}</p> */}

            <img
              src={iconCard}
              alt="icono carrito"
              className="header__carrito"
            />
          </NavLink>
        </div>
        <pre className="header__user">Login</pre>
      </div>
    </header>
  );
};

export { HeaderNav };
