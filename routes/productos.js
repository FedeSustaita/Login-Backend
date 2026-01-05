import express from "express";
import Producto from "../models/Productos.js";

const router = express.Router();

/* =========================
   CREAR PRODUCTO
========================= */
router.post("/", async (req, res) => {
  try {
    const { listadoId, nombre, cantidad, precio, stockEst } = req.body;

    if (!listadoId || !nombre) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const producto = new Producto({
      listadoId,
      nombre,
      cantidad: Number(cantidad) || 0,
      precio: Number(precio) || 0,
      stockEst: Number(stockEst) || 0,
    });

    const guardado = await producto.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =========================
   OBTENER TODOS (debug)
========================= */
router.get("/", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

/* =========================
   OBTENER POR LISTADO ID ✅
========================= */
router.get("/listado/:id", async (req, res) => {
  try {
    const productos = await Producto.find({
      listadoId: Number(req.params.id),
    });

    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   OBTENER POR ID
========================= */
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =========================
   ACTUALIZAR PRODUCTO
========================= */
router.put("/:id", async (req, res) => {
  try {
    const { nombre, cantidad, precio, stockEst } = req.body;

    const update = {};

    if (nombre !== undefined) update.nombre = nombre;
    if (cantidad !== undefined) update.cantidad = Math.max(0, Number(cantidad));
    if (precio !== undefined) update.precio = Number(precio);
    if (stockEst !== undefined) update.stockEst = Number(stockEst);

    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =========================
   ELIMINAR PRODUCTO
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
