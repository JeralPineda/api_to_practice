import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true, //limpiar espacios
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  },
});

// Configuración para que se muestre solo la información que necesito ver
userSchema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject(); //Referencia a todo el objeto
  object.id = _id; // Remplazo en el object

  return object;
};

export default mongoose.model('User', userSchema);
