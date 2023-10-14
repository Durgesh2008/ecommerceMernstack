import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddelware.js';
import { GetCategoryController, GetSingalCategoryController, createCategoryController, deleteCategoryController, updateCategoryController } from '../controllers/categoryController.js';
const router=express.Router();

// Routes
// -----------create-category---------------------------------
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)
// ------------------update-category----------------------------------
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)
// ---------get all categories
router.get('/categories',GetCategoryController);
// --------singal categoty--------
router.get('/single-category/:slug',GetSingalCategoryController)
// -----Delete category----------
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);
export default router;