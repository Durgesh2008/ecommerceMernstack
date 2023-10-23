import mongoose from "mongoose";

const productSchema = mongoose.Schema({ 
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "categoryModel",
    required: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  shipping: {
    type: Boolean,
  },
  rating: {
    type: Number,
    required: true,
  },
},{timestamps:true});

export default mongoose.model("productModel", productSchema);
