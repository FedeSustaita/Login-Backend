import mongoose from "mongoose";

const varianteSchema = new mongoose.Schema({
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
    },

    atributos: {
        type: Map,
        of: String,
        required: true
    },

    cantidad: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Variante", varianteSchema);
