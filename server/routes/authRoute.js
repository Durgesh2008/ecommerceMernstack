import express  from "express";
import { forgotPassword, getAlluser, loginController, registerController, testcontroller } from "../controllers/authcontrollers.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddelware.js";


// router object
const router=express.Router();

// routing 
// ---------------------------Register Routes || methode Post || No Login Required-------------------
router.post('/register',registerController);
// login route
router.post('/login',loginController)
router.post('/forgot_password',forgotPassword);

// protected Route
router.get('/user-auth',requireSignIn,(req,res)=>{
   return  res.status(200).send({ok:true})
})
// test
router.get('/admin-auth',requireSignIn,isAdmin, testcontroller)
router.get('/alluser',requireSignIn,isAdmin, getAlluser)
export default router;
