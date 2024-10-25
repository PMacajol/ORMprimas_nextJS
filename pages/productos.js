import { useState, useEffect } from "react";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <div>
      <h1>Listado de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio} (Código: {producto.codigo})
          </li>
        ))}
      </ul>
    </div>
  );
}
