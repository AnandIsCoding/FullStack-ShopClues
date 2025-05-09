import chalk from 'chalk'
import Category from "../models/category.model.js";
import Product from '../models/product.model.js'
import { isFileTypeSupported, uploadFileToCloudinary } from "../utils/helpers.utils.js";


// create category controller , only admin
export const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const thumbnail = req.file
    if (!name || !description || !thumbnail) {
      return res.status(401).json({
        success: false,
        message: "Required Field Missing !",
        error: "Required Field Missing",
      });
    }
   
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Category name must be at least 2 characters long",
        error: "Category name too short",
      });
    }
    // check if category already exists with same name
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(409).json({
        success: false,
        message: "Category already exists!",
        error: "Duplicate category",
      });
    }
    // handle file upload thumbnail
    const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = thumbnail.originalname.split(".").pop().toLowerCase();
    
        if (!isFileTypeSupported(fileType, supportedTypes)) {
          return res.status(400).json({
            success: false,
            message: "Invalid File type. Only jpg, jpeg and png supported.",
            error: "Unsupported file type",
          });
        }
    // upload file to cloudinary
        const response = await uploadFileToCloudinary(thumbnail.path, "ShopClues");
    // create category
    const category = await Category.create({
      name,
      description,
      thumbnail:response.secure_url
    });
    // return response 
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully !!",
      category,
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
      chalk.bgRed("Error in createCategoryController ------->>> "),
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Internal Server Error !!",
    });
  }
};

// get all category controller

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find();
    return res
      .status(200)
      .json({
        success: true,
        message: categories.length > 0 ? "Categories Fetched Successfully !!" : "No Category Found in DB !!",
        error:categories.length > 0 ? "Categories Fetched Successfully !!" : "No Category Found in DB !!",
        categories,
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
      chalk.bgRed("Error in getAllCategoriesController ------->>> "),
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Internal Server Error !!",
    });
  }
};

// getProductByCategory

export const getProductsByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
        error: "Missing categoryId",
      });
    }

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        error: "Invalid categoryId",
      });
    }

    const products = await Product.find({ category: categoryId });

    return res.status(200).json({
      success: true,
      message: products.length > 0 ? "Products fetched successfully" : "No products found in this category",
      products,
    });

  } catch (error) {
    console.error(chalk.bgRed("Error in getProductsByCategoryController ------->>> "), error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: "Something went wrong while fetching products by category",
    });
  }
};


// delete category controller

export const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Category _id not provided!",
        error: "Category _id is missing",
        });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Category not found in DB!",
        error: "Invalid categoryId",
        });
    }

        // Check if there are any products linked to this category
        const productsInCategory = await Product.find({ category: categoryId });
        if (productsInCategory.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Cannot delete category because products are linked to it.",
            error: "Products exist in this category",
          });
        }
    // if no product linked with the category than find and delete
    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
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
      chalk.bgRed("Error in deleteCategoryController ------->>> "),
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Internal Server Error !!",
    });
  }
};
