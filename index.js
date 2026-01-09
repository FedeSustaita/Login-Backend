import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Rutas
import productosRoutes from "./routes/productos.js";
import usuariosRoutes from "./routes/usuarios.js";
import movimientosRoutes from "./routes/movimientos.js";
import variantesRoutes from "./routes/variantes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

const db = mongoose.connection;
db.once("open", async () => {
  console.log("🔹 Conexión abierta a MongoDB");

  const colecciones = await db.db.listCollections().toArray();
  console.log("Colecciones en la DB:", colecciones.map(c => c.name));
});

// Rutas principales
app.get("/", (req, res) => res.send("Servidor corriendo"));

// Rutas separadas
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/movimientos", movimientosRoutes);
app.use("/variantes", variantesRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
