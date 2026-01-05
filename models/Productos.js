import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  listadoId: { type: Number, required: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, default: 0 },
  precio: { type: Number, required: true },
  descripcion: String,
  stockEst: Number
});

export default mongoose.model("Producto", productoSchema);
