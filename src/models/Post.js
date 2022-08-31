import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, //limpiar espacios
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  created: {
    type: Date,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  },
  image: {
    url: String,
    public_id: String,
  },
});

// Configuración para que se muestre solo la información que necesito ver
postSchema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject(); //Referencia a todo el objeto
  object.id = _id; // Remplazo en el object

  return object;
};

export default mongoose.model('Post', postSchema);
