import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: [3, "User Name must be at least 3 characters long"],
    maxLength: [50, "User Name must be less than 50 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  contact: {
    type: String,
    validate: {
      validator: (v) => /^\d{10}$/.test(v),
      message: "Invalid phone number format",
    },
  },
  accountType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  cart:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
    }
  ,
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wishlist',
    }
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    }
  ]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
