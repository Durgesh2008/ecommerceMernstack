import cartModel from "../models/cartModel.js";
import userModel from "../models/userModel.js";


export  const postCartData=async(req,res)=>{
    try {
        const { name, description, price, category, quantity, shipping, rating,image,userid } =req.body;
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping ||
            !rating
          ) {
            return res.status(400).send({
              success: false,
              message: "missing filed",
            });
          }

          const cart=new cartModel({...req.body});
          await cart.save();
          const user=await userModel.findById({_id:userid});
          user.carts.push(cart._id)
          return res.status(200).send({
            success: true,
            message: "Cart added successfully",
            product,
          });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in addind cart",
          });
    }

} 

export const getCartData=async(req,res)=>{
    try {
      const {userid}=req.body;
      const carts=await userModel.findById({_id:userid}).papulate('carts').exec().carts;
      return res.status(200).send({
        success: true,
        message: "Cart added successfully",
         carts ,
      });
       
    }catch (error) {
      return res.status(500).send({
          success: false,
          message: "Error in addind cart",
        });
}
}

export const deleteCartData=async(req,res)=>{
  try {
    const {userid,cartid}=req.body;
    await cartModel.findOneAndDelete({_id:cartid});
    await  userModel.findByIdAndUpdate(userid, { $pull: { carts: cartid } },{ new: true })
    return res.status(200).send({
      success: true,
      message: "Cart deleted successfully",
      
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in addind cart",
    });
  }
}


export const multipleDelete=async(req,res)=>{
  // cartids=['cart1id','cart2id']
  const {userid,cartIdsToDelete}=req.body;
  try {
    await cartModel.deleteMany({ _id: { $in: cartIdsToDelete } })
    await userModel.findByIdAndUpdate(userid, { $pull: { carts: { $in: cartIdsToDelete } } }, { new: true })
   

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in addind cart",
    });
  }
}