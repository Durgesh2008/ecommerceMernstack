import  express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddelware.js";
import { AllProducts, FilterProductController, RelatedProductController, SearchProductController, SingleProduct, braintreePaymentController, braintreeTokenController, createProductController, deleteProduct, getProductphoto, updateProductController } from "../controllers/productController.js";
import formidableMiddleware from 'express-formidable'
const router=express.Router()

// create-product
router.post('/create-product',requireSignIn,isAdmin,formidableMiddleware(),createProductController)
// get all products
router.get('/getAll-product',AllProducts)
// get single Product
router.get('/getAll-product/:slug',SingleProduct);
// product photo
router.get("/product-photo/:pid",getProductphoto);
// delete Product
router.delete("/delete-product/:id",deleteProduct);
// update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidableMiddleware(),updateProductController)

router.post('/filter-product',FilterProductController)
router.get('/search-product/:keyword',SearchProductController)
router.get('/related-product/:pid/:cid',RelatedProductController)

// Payment Route 
//token
router.get('/braintree/token',braintreeTokenController)
// payment
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

export default router