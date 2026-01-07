import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  idDeListado: { type: Number, default: 1 },
  empresa: { type: String},
});
// Hook para generar idDeListado automáticamente
usuarioSchema.pre("save", async function() {
  if (this.isNew) {
    const lastUser = await this.constructor.findOne().sort({ idDeListado: -1 });
    this.idDeListado = lastUser ? lastUser.idDeListado + 1 : 1;
  }
});

 
export default mongoose.model("Usuario", usuarioSchema);
