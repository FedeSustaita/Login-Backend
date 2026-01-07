import express from "express";
import Usuario from "../models/Usuarios.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { username, password, empresa } = req.body;
        const Usuarios = new Usuario({ username, password, empresa });
        const guardado = await Usuarios.save();
        res.status(201).json(guardado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Obtener todos los productos
router.get("/", async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

export default router;
