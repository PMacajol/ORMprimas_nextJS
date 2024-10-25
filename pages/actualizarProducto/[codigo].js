import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ActualizarProducto() {
  const router = useRouter();
  const { codigo } = router.query; // Obtener el código del producto desde la URL
  const [producto, setProducto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    if (codigo) {
      // Cargar el producto con el código proporcionado
      fetch(`/api/productos/${codigo}`)
        .then((res) => res.json())
        .then((data) => {
          setProducto(data);
          setNombre(data.nombre);
          setPrecio(data.precio);
        });
    }
  }, [codigo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/productos/${codigo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, precio }),
    });

    if (res.ok) {
      alert("Producto actualizado con éxito");
      router.push("/productos"); // Redirigir al listado de productos
    } else {
      alert("Error al actualizar el producto");
    }
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Actualizar Producto</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <button type="submit">Actualizar</button>
    </form>
  );
}
