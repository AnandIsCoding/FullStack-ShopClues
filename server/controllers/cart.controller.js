import User from "../models/user.model.js"; 
import Product from "../models/product.model.js"; 
import Cart from "../models/cart.model.js"; 
// in now cart for user 
// agar cart nhi h user k pass, !user.cart, than create a new cart document in cart collection, in that userId : cart._id, and items will be [{product._id}]
// than save cart cart.save(), and update user user.cart = cart._id and save (user model has a cart field which stores cartDocument id associated with that user)
//if user have cart already
// assign cart to the cart variable
// check if productId is already in cart.items (items field is in cart model)
/// if product axists than splice , index find kr k cart.items.splice(index,1)
// if product is not in cart than push productId to cart.items

// summary: toggle toggle khelna h 😊

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




// get cart , with populating cart, path will be items.productId and model to refer will be Product

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