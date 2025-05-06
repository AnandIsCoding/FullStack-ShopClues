import User from "../models/user.model.js"; 
import Product from "../models/product.model.js"; 
import Cart from "../models/cart.model.js"; 


export const addRemoveCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (userId, productId)",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let cart;
    if (!user.cart) {
      cart = new Cart({
        userId: user._id,
        items: [{ productId }],
      });
      await cart.save();

      user.cart = cart._id;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Cart created and product added",
        cart,
      });
    } else {
      cart = user.cart;

      const existingProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingProductIndex !== -1) {
        cart.items.splice(existingProductIndex, 1);
        await cart.save();

        return res.status(200).json({
          success: true,
          message: "Product removed from cart",
          cart,
        });
      } else {
        cart.items.push({ productId });
        await cart.save();

        return res.status(200).json({
          success: true,
          message: "Product added to cart",
          cart,
        });
      }
    }

  } catch (error) {
    console.error("Error in addRemoveCartController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};




// get cart 

export const getUserCartController = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find user and populate the cart
    const user = await User.findById(userId).populate({
      path: "cart",
      populate: {
        path: "items.productId",
        model: "Product",
      },
    });

    if (!user || !user.cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error in getUserCartController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};