import mongoose from "mongoose";
const cartSchema = mongoose.Schema({ 
    name: {
      type: String,
      required: true,
    },
    pid:{
      type: String,
      required: true,
      unique:true
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
      type: String,
     
    },
    quantity: {
      type: Number,
      require: true,
    },
    
    shipping: {
      type: Boolean,
    },
    rating: {
      type: Number,
      required: true,
    },
    count:{
      type:Number,
      default:1
    }
  },{timestamps:true});
  
  export default mongoose.model("cartModel", cartSchema);