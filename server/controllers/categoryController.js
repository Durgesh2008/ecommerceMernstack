import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController=async(req,res)=>{
try {
    const {name}=req.body;
    if(!name){
        return res.status(401).send({
            success:false,
            message:"category name is required"
        })
    }
    const existCategory=await categoryModel.findOne({name});

    if(existCategory){
        return res.status(200).send({
            success:true,
            message:`${name} already exist`
        })
    }
    const category=await new categoryModel({name,slug:slugify(name)}).save();

    return res.status(201).send({
        success:true,
        message:`${name} category created successfully`,
        category
    })
} catch (error) {
    return res.status(500).send({
        success:false,
        message:"error in create category"
    })
}
}

export const updateCategoryController =async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        if(!name || !id){
            return res.status(401).send({
                success:false,
                message:"error in is or name"
            })
        }
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        return res.status(200).send({
            success:true,
            message:`${name}  Updated successfully`,
            category
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"error in upadte category"
        })
    }
}

export const GetCategoryController=async(req,res)=>{
    try {
        const categories=await categoryModel.find({});
        return res.status(200).send({
            success:true,
            categories
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in Fetching Categories"
        })
    }
}

export const GetSingalCategoryController=async(req,res)=>{
    try {
        const {slug}=req.params;
        const category=await categoryModel.findOne({slug});
        return res.status(200).send({
            success:true,
            category
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in Fetching Categories"
        })
    }
}


export const deleteCategoryController=async (req,res)=>{
    try {
        const {id}=req.params;
        const deleteCategory=await categoryModel.findByIdAndDelete(id);
        return res.status(200).send({
            success:true,
            message:`${deleteCategory.name} is Deleted`,
          
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in Delete Categories"
        })
    }
}
