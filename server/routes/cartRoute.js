import express from 'express'
import {requireSignIn } from '../middleware/authMiddelware.js';
import { deleteCartData, getCartData, multipleDelete, postCartData,incrementDecrementCount } from '../controllers/cartcontroller.js';
const router=express.Router();
 
router.post('/postCart_data',requireSignIn,postCartData)
router.post('/updateCount',requireSignIn,incrementDecrementCount)
router.get('/getCart_data',requireSignIn,getCartData)
router.delete('/deleteCart_data',requireSignIn,deleteCartData)
router.delete('/multideleteCart_data',requireSignIn,multipleDelete)

export default router;