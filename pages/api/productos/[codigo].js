import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { codigo } = req.query;

  if (req.method === "GET") {
    // Buscar producto por código
    const producto = await prisma.producto.findUnique({
      where: { codigo },
    });
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } else if (req.method === "PUT") {
    // Actualizar producto
    const { nombre, precio } = req.body;
    try {
      const productoActualizado = await prisma.producto.update({
        where: { codigo },
        data: { nombre, precio: parseFloat(precio) },
      });
      res.status(200).json(productoActualizado);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar el producto" });
    }
  }
}
