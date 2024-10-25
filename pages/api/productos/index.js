import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Obtener todos los productos
    const productos = await prisma.producto.findMany();
    res.status(200).json(productos);
  } else if (req.method === "POST") {
    // Crear un nuevo producto
    const { nombre, codigo, precio } = req.body;
    try {
      const nuevoProducto = await prisma.producto.create({
        data: { nombre, codigo, precio: parseFloat(precio) },
      });
      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(400).json({ error: "Error al crear el producto" });
    }
  }
}
