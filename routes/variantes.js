import express from "express";
import Variante from "../models/Variantes.js";
import Producto from "../models/Productos.js";

const router = express.Router();

// 🔁 recalcular cantidad producto
const recalcularCantidad = async (productoId) => {
  const variantes = await Variante.find({ productoId });
  const total = variantes.reduce(
    (acc, v) => acc + v.cantidad,
    0
  );

  await Producto.findByIdAndUpdate(productoId, {
    cantidad: total
  });
};

// ➕ Crear variante
router.post("/", async (req, res) => {
  try {
    const variante = new Variante(req.body);
    await variante.save();

    await recalcularCantidad(variante.productoId);

    res.status(201).json(variante);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Listar variantes por producto
router.get("/producto/:productoId", async (req, res) => {
  const variantes = await Variante.find({
    productoId: req.params.productoId
  });
  res.json(variantes);
});

// ✏️ Modificar variante (ej venta/compra)
router.put("/:id", async (req, res) => {
  const variante = await Variante.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  await recalcularCantidad(variante.productoId);
  res.json(variante);
});

// 🗑 Eliminar variante
router.delete("/:id", async (req, res) => {
  const variante = await Variante.findByIdAndDelete(req.params.id);
  await recalcularCantidad(variante.productoId);
  res.sendStatus(204);
});

export default router;
