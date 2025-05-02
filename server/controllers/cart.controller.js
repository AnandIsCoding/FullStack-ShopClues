import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
  };



  export const addToCart = async (req, res) => {
    const { productId } = req.body;
  
    if (!productId) return res.status(400).json({ message: "Product ID is required" });
  
    try {
      let cart = await Cart.findOne({ userId: req.user._id });
  
      if (!cart) {
        cart = new Cart({
          userId: req.user._id,
          items: [{ productId }]
        });
      } else {
        const exists = cart.items.some(
          (item) => item.productId.toString() === productId
        );
  
        if (!exists) {
          cart.items.push({ productId });
        } else {
          return res.status(400).json({ message: "Product already in cart" });
        }
      }
  
      await cart.save();
      res.status(200).json({ message: "Product added to cart", cart });
  
    } catch (err) {
      res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
  };

  


  export const removeFromCart = async (req, res) => {
    const { productId } = req.body;
  
    if (!productId) return res.status(400).json({ message: "Product ID is required" });
  
    try {
      const cart = await Cart.findOne({ userId: req.user._id });
  
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
  
      await cart.save();
      res.status(200).json({ message: "Product removed from cart", cart });
  
    } catch (err) {
      res.status(500).json({ message: "Error removing from cart", error: err.message });
    }
  };
  
  