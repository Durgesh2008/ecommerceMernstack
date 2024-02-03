import { comparePassword, hashedPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
// Regiter controllers-----------------------------------------------
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    // form validation
    if (name && email && password && phone && address && answer) {
      //   check user is not in database
      const existuser = await userModel.findOne({ email });
      if (existuser) {
        return res.status(200).send({
          success: true,
          message: "User already Register please Login",
        });
      }

      // hased password
      const encrptpassword = await hashedPassword(password);

    //   create new user in database
      const user =await new userModel({
        name,
        email,
        phone,
        password: encrptpassword,
        address,answer
      }).save();

      return res.status(201).send({
        success: true,
        message: "register successfully",
        user,
      });
      
    } else {
      return res.status(200).send({
        success: false,
        message: "some field is missing",
      });
    }
  } catch (error) {
    console.log("error in registerController");
    res.status(500).send({
      success: false,
      message: "error in registerController",
      error,
    });
  }
};

// Login controllers -----------------------------------------------
export const loginController = async (req, res) => {
    try {
      const {email, password } = req.body;

      // validation
      if (!email || !password) {
        return res.status(200).send({
            success: false,
            message: "some field is missing",
          });   
      } 

      const user=await userModel.findOne({email});

      if(!user){
        return res.status(200).send({
            success: false,
            message: "user is not found",
          });  
      }
       //   compare password
       const matchPassword=await comparePassword(password,user.password);
       if(!matchPassword){
        return res.status(200).send({
            success: false,
            message: "wrong credentials",
          });  
        
       }
 
     //   generate token
     const token= JWT.sign({_id:user._id},process.env.SERET_KEY,{expiresIn:"5d",});
   return res.status(200).send({
     success:true,
     message:"Login successfully",
     user:{
         id:user._id,
         name:user.name,
         email:user.email,
         phone:user.phone,
         address:user.address,
         role:user.role
     },
     token
   })
 
     
    } catch (error) {
      console.log("error in registerController");
      res.status(500).send({
        success: false,
        message: "error in loginController",
        error,
      });
    }
  };
  
export const forgotPassword=async(req,res)=>{
try {
  const {email,answer,newpassword}=req.body;
   if(!email){
    return  res.status(400).send({
      success: false,
      message: "email is required",
    
    });
   }
   if(!answer){
    return  res.status(400).send({
      success: false,
      message: "answer is required",
    
    });
   }
   if(!newpassword){
    return  res.status(400).send({
      success: false,
      message: "fill new password is required",
    
    });}
    // check answer and user
    const user =await userModel.findOne({email,answer})
    if(!user){
      return  res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }
    const hashed=await hashedPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    return  res.status(200).send({
      success: true,
      message: "Password updated successfully",
    
    });
   
} catch (error) {
  console.log("error in forgot password")
  res.status(500).send({
    success: false,
    message:"error in forgotPassword",
    error,
  });
}
}
 
export const testcontroller=async(req,res)=>{
    return res.status(200).send({ok:true})
  }
  export const getAlluser=async(req,res)=>{
    try {
      const users=await userModel.find({});
      return res.status(200).send({
        success: true,
        users,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "error in fetch all user",
        error,
      });
    }
  }