import mongoose from "mongoose";

const movimientoSchema  = new mongoose.Schema({
    tipo: { type: String, required: true },
    producto: { type: String, required: true },
    variante: { type: String, default: "" },
    cantidad: { type: Number, required: true },
    listadoId: { type: Number, required: true,},
    precio: { type: Number, required: true,},
    fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Movimiento", movimientoSchema );
