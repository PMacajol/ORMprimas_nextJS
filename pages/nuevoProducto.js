import { useState } from "react";

export default function NuevoProducto() {
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    precio: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { nombre, codigo, precio } = formData;
    if (!nombre || !codigo || !precio) {
      return "Todos los campos son obligatorios";
    }
    if (isNaN(precio) || Number(precio) <= 0) {
      return "El precio debe ser un número positivo";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error al crear el producto");
      }

      alert("Producto creado con éxito");
      setFormData({ nombre: "", codigo: "", precio: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="form-container">
        <h1>Añadir Nuevo Producto</h1>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Código del Producto
            </label>
            <input
              type="text"
              name="codigo"
              placeholder="Código"
              value={formData.codigo}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button
            type="submit"
            className={`form-button ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Producto"}
          </button>
        </form>
      </div>
    </div>
  );
}
