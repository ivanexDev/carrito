import { useForm } from "react-hook-form";
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import carro from "./assets/carrito.png";

function App() {
  const { register, handleSubmit } = useForm();

  const [compra, setCompra] = useState([]);

  const calcularSumaTotal = () => {
    return compra.reduce(
      (total, item) => total + item.cantidad * item.precio,
      0
    );
  };

  const onSubmit = (data) => {
    console.log(data);
    setCompra([
      ...compra,
      {
        nombre: data.producto,
        cantidad: data.cantidad,
        precio: data.precio,
        id: compra.length + 1,
      },
    ]);
  };

  useEffect(() => {
    console.log(compra);
  }, [compra]);

  const handleDelete = (id) => {
    setCompra(compra.filter((item) => item.id !== id));
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;

    setCompra((prevCompra) =>
      prevCompra.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  return (
    <>
      <h1>Carrito de Compras!</h1>
      <img className="carro" src={carro} alt="Imagen de un carro de compras" />
      {compra.map((item, index) => {
        return (
          <div className="item" key={index}>
            <input
              type="text"
              name="nombre"
              value={item.nombre}
              onChange={(e) => handleChange(e, item.id)}
            />
            <input
              type="text"
              name="cantidad"
              value={item.cantidad}
              onChange={(e) => handleChange(e, item.id)}
            />
            <input
              type="text"
              name="precio"
              value={item.precio}
              onChange={(e) => handleChange(e, item.id)}
            />
            <p className="total-unitario">{item.cantidad * item.precio}</p>
            <button className="eliminar" onClick={() => handleDelete(item.id)}>
              Eliminar
            </button>
          </div>
        );
      })}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("producto", { required: true })}
          placeholder="Producto"
        />
        <input
          {...register("cantidad", { required: true })}
          placeholder="Cantidad"
        />
        <input
          {...register("precio", { required: true })}
          placeholder="Precio"
        />
        <button type="submit"> Agregar</button>
      </form>
      <p className="total">Total: {calcularSumaTotal()}</p>
    </>
  );
}

export default App;
