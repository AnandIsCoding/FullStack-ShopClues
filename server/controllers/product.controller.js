import chalk from "chalk";

import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import {
  isFileTypeSupported,
  uploadFileToCloudinary,
} from "../utils/helpers.utils.js";

// create product
// required: title, description, price, stock, category, thumbnail,
export const createProductController = async (req, res) => {
  try {
    // extract all required fields
    // validate if any required details, field missing
    // validate stock and price
    // check if product already exists
    // check if category exists or not, if not return error with message
    // than upload thumbnail to cloudinary
    // create product and return response
    const { title, description, price, stock, categoryId } = req.body;
    const thumbnail = req.file ? req.file : null;
    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !categoryId ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "Required Field Missing",
        error:
          "Required Field Missing (check title, description, price, stock, category, thumbnail)",
      });
    }
    //validate price
    if (price < 0) {
      return res.status(400).json({
        success: false,
        message: "Product Price can`t be negative !!",
        error: "Product Price can`t be negative !!",
      });
    }
    // validate stock
    if (stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock can`t be negative !!",
        error: "Stock can`t be negative !!",
      });
    }
    // check if product already exists
    const product = await Product.findOne({ title });
    if (product) {
      return res.status(400).json({
        success: false,
        message: "Product already Exists in DB !!",
        error: "Product already Exists in DB !!",
      });
    }
    // category exists check
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Invalid Category ID",
        error: "Category not found",
      });
    }
    // thumbnail handling
    const supportedTypes = ["jpeg", "jpg", "png"];
    const fileType = thumbnail.originalname.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Invalid File type. Only jpg, jpeg and png supported.",
        error: "Unsupported file type",
      });
    }

    const response = await uploadFileToCloudinary(thumbnail.path, "ShopClues");

    // create product
    const newProduct = await Product.create({
      title,
      description,
      price,
      stock,
      category: categoryId,
      thumbnail: response.secure_url,
    });
    //return response with newly created product
    return res
      .status(201)
      .json({
        success: true,
        message: "Product Created Successfully !!",
        product: newProduct,
      });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error ------>> "), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }
    console.error(
      chalk.bgRed("Error in createProductController ------->>> "),
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Internal Server Error !!",
    });
  }
};

// getAllProducts

export const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    return res.status(200).json({
      success: true,
      message: products.length > 0
        ? "Products Fetched Successfully !!"
        : "No Products Found",
      products,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error ------>> "), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }
    console.error(
      chalk.bgRed("Error in getAllProductsController ------->>> "),
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Internal Server Error !!",
    });
  }
};


// get product by id controller
export const getProductByIDController = async(req,res) =>{
  try {
    // fetch productId from req.params
    // check if productId not found
    // check if productId is a valid mongoose objectId
    // db query for productId findByID, and populate it with category
    // return response with product
    const {productId} = req.params
    if(!productId){
      return res.status(400).json({success:false, message:'productId not Found !!', error:'productId not Found !!'})
    }
    // check if productId is valid mongoose objectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID format",
        error: "Invalid Product ID format",
      });
    }
    const product = await Product.findById(productId).populate('category')
    if(!product){
      return res.status(404).json({success:false, message:'Product Not Found !!', error:'Product Not Found !!'})
    }
    return res.status(200).json({success:true, message:'Product fetched Successfully !!', product})
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error ------>> "), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }
    console.error(
      chalk.bgRed("Error in getProductByIDController ------->>> "),
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Internal Server Error !!",
    });
  }
}



// delete product controller ---------------------------------------------------------------------------


export const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID not provided",
        error: "Missing productId in request",
      });
    }

    // Check if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID format",
        error: "Invalid Product ID",
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        error: "No product with the given ID",
      });
    }

    // Delete product
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("Error in deleteProductController --->>", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: "Something went wrong while deleting product",
    });
  }
};
