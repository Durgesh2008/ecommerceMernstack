import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    Products:[{
        type:mongoose.ObjectId,
        ref:"productModel"
    }],
    payment: {},
    buyer:{
        type:mongoose.ObjectId,
        ref:"userModel"
    },
    status :{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","shipped","delived","cancel"]
    }
  });
export default mongoose.model("orderModel", orderSchema);