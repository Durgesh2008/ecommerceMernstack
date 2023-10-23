import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping, rating } =
      req.fields;
    const { image } = req.files;
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
        message: "All fields is neccessary",
      });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();
    return res.status(201).send({
      success: true,
      message: "Product is craeted successfully",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in making product",
    });
  }
};

export const AllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const size = await productModel.find({});
    
    const Product = await productModel
      .find({})
      .populate("category")
      .select("-image")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: size.length,
     
      Product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting product",
    });
  }
};

export const SingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const Product = await productModel
      .find({ slug })
      .populate("category")
      .select("-image");
    return res.status(200).send({
      success: true,

      Product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in getting single product",
    });
  }
};

export const getProductphoto = async (req, res) => {
  try {
    const photo = await productModel.findById(req.params.pid).select("image");
    if (photo.image.data) {
      res.set("Content-type", photo.image.contentType);
      return res.status(200).send(photo.image.data);
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Product Image",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Delete Product ",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping, rating } =
      req.fields;
    const { image } = req.files;
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
        message: "All fields is neccessary",
      });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();
    return res.status(200).send({
      success: true,
      message: "Product is Updated  successfully",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Update Product ",
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Delete All Product ",
    });
  }
};
