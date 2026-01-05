import express from "express";
import Movimiento from "../models/Movimientos.js";

const router = express.Router();

/* =========================
   CREAR MOVIMIENTO
========================= */
router.post("/", async (req, res) => {
  try {
    const movimiento = new Movimiento(req.body);
    const guardado = await movimiento.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =========================
   OBTENER MOVIMIENTOS
   POR LISTADO
========================= */
router.get("/listado/:listadoId", async (req, res) => {
  try {
    const listadoId = Number(req.params.listadoId);

    const movimientos = await Movimiento.find({ listadoId })
      .sort({ fecha: -1 });

    res.json(movimientos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   (OPCIONAL) TODOS
========================= */
router.get("/", async (req, res) => {
  const movimientos = await Movimiento.find();
  res.json(movimientos);
});

export default router;
