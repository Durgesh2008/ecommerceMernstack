import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import dotenv from "dotenv";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
dotenv.config();
let gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANTID,
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY,
});

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

export const FilterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    if (checked.length > 0 || radio.length) {
      const Product = await productModel.find(args).select("-image");
      return res.status(200).send({
        success: true,
        Product,
      });
    }
    return res.status(200).send({
      success: true,
      Product: [],
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in Filter  Product ",
    });
  }
};

export const SearchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (keyword !== "") {
      const result = await productModel
        .find({
          $or: [
            {
              name: { $regex: keyword, $options: "i" },
            },
            {
              description: { $regex: keyword, $options: "i" },
            },
          ],
        })
        .select("-image");
      return res.status(200).send({
        success: true,
        result,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Error in Search  Product ",
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in Search  Product ",
    });
  }
};

export const RelatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const result = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-image")
      .limit(3)
      .populate("category");
    return res.status(200).send({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in while fetching Related  Product ",
    });
  }
};

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, resp) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(resp);
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in while getting payment token ",
    });
  }
};

export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    console.log(req.body)
    // let total = 0;
    // cart.map((i) => {
    //   total += i.price;
    // });

    // let newTransition = gateway.transaction.sale(
    //   {
    //     amount: total,
    //     paymentMethodNonce: nonce,
    //     options: {
    //       submitForSettlement: true,
    //     },
    //   },
    //   function (err, result) {
    //     if (err) {
    //       res.status(500).send(err);
    //     } else {
    //       let order = new orderModel({
    //         Products: cart,
    //         payment: result,
    //         buyer: req.user._id,
    //       }).save();
    //       res.json({ ok: true });
    //     }

    //     if (result.success) {
    //       console.log("Transaction ID: " + result.transaction.id);
    //     } else {
    //       console.error(result.message);
    //     }
    //   }
    // );
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in while fetching Related  Product ",
    });
  }
};
