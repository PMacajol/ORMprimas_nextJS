"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Funciones de navegación
  const goToCreateProduct = () => router.push("/nuevoProducto");
  const goToSearchProduct = () => router.push("/productos");
  const goToUpdateProduct = () => router.push("/actualizarProducto/A001");

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Gestión de Productos
        </h1>

        <div className="space-y-6">
          <button
            onClick={goToCreateProduct}
            className="w-full py-3 px-6 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-all"
          >
            Crear Producto
          </button>
          <button
            onClick={goToSearchProduct}
            className="w-full py-3 px-6 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-all"
          >
            Búsqueda de Productos
          </button>
          <button
            onClick={goToUpdateProduct}
            className="w-full py-3 px-6 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-all"
          >
            Actualización de Productos
          </button>
        </div>
      </div>
    </div>
  );
}
