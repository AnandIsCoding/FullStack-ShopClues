import User from "../models/user.model.js"; 
import Product from "../models/product.model.js"; 
import Cart from "../models/cart.model.js"; 

export const addToCartController = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate input
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (userId, productId)",
      });
    }

    // Check if the product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user already has a cart
    if (!user.cart) {
      // If the user doesn't have a cart, create one
      const newCart = new Cart({
        userId: user._id,
        items: [{ productId }],
      });

      // Save the new cart to the user's model
      user.cart = newCart;
    } else {
      const cart = user.cart;

      // Check if the product already exists in the cart
      const existingProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingProductIndex !== -1) {
        // If product is already in the cart, remove it
        cart.items.splice(existingProductIndex, 1); // Remove the item from the array

        // Save the updated cart
        await user.save();

        return res.status(200).json({
          success: true,
          message: "Product removed from cart successfully",
          cart: user.cart, // Return the updated cart
        });
      }

      // If the product is not in the cart, add it
      cart.items.push({ productId });
    }

    // Save the updated user document with the modified cart
    await user.save();

    // Return the updated cart
    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart: user.cart, // Return the updated cart
    });
  } catch (error) {
    console.error("Error in addToCartController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
