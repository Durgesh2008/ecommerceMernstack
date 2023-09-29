import express  from "express";
import { loginController, registerController, testcontroller } from "../controllers/authcontrollers.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddelware.js";


// router object
const router=express.Router();

// routing 
// ---------------------------Register Routes || methode Post || No Login Required-------------------
router.post('/register',registerController);
// login route
router.post('/login',loginController)

// test
router.get('/test',requireSignIn,isAdmin, testcontroller)
export default router;
