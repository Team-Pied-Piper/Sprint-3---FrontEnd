import "./Loader.css";
const Loader = () => {
  return (
    <div className="contenedor__loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export { Loader };
