import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  barcode: {
    type: Number,
    required: [true, 'Barcode is required.'],
    unique: true,
  },
  material: {
    type: Number,
    required: [true, 'Material is required.']
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
  name: {
    type: String,
    default: '',
  },
  details: {
    type: Object,
    default: {},
  },
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;
