import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chalk from 'chalk'
import User from "../models/user.model.js";
import { isFileTypeSupported, uploadFileToCloudinary } from "../utils/helpers.utils.js";

export const signupController = async (req, res) => {
  try {
    const { userName, email, password, contact, googleId } = req.body;
    const profilePic = req.file ? req.file : null;

    // Basic validations
    if (!userName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Required Field Missing!',
        error: 'Required Field Missing!',
      });
    }

    if (!googleId && !password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required when not using Google login.',
        error: 'Missing password',
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: 'User already Registered!',
        error: 'User already exists',
      });
    }

    // Password validation (only for regular login)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    if (!googleId && !passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 5 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
        error: "Invalid password format",
      });
    }

    // Handle file upload if present
    let profilePicUrl;
    if (profilePic) {
      const supportedTypes = ["jpeg", "jpg", "png"];
      const fileType = profilePic.originalname.split(".").pop().toLowerCase();

      if (!isFileTypeSupported(fileType, supportedTypes)) {
        return res.status(400).json({
          success: false,
          message: "Invalid File type. Only jpg, jpeg and png supported.",
          error: "Unsupported file type",
        });
      }

      const response = await uploadFileToCloudinary(profilePic.path, "ShopClues");
      profilePicUrl = response.secure_url;
    }

    const encryptedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Create the user
    const user = await User.create({
      userName,
      email,
      password: encryptedPassword,
      googleId,
      contact,
      profilePic:profilePicUrl
    });

    // Generate token
    const usertoken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("userToken", usertoken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production" ? true : false, // For testing locally without HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    

    res.status(201).json({
      success: true,
      message: "User registered successfully !!",
      user,
      userToken:usertoken
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error ----->>> "), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }
    console.error(chalk.bgRed("Error in signupController in auth.controller.js ---->>>"), error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:"Internal Server Error"
    });
  }
};




export const loginController = async(req,res) =>{
  try {
    const {email, password} = req.body
    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: 'Required Field Missing!',
        error: 'Required Field Missing!',
      });
    }
    //userExists
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({success:false, message:'User Not Found With Provided email !!', error:'User Not Found With Provided email !!'})
    }
    // compare password with password saved in db for the registered user
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(409).json({success:false, message:'Invalid Credentials !!', error:'Invalid Credentials !! '})
    }
    //user password is corect , now send cookies
    const usertoken = jwt.sign({ _id: user._id, accountType: user.accountType }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("userToken", usertoken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production" ? true : false, // For testing locally without HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({
        message: "User Login successfull",
        success: true,
        user,
        userToken: usertoken,
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
    console.error(chalk.bgRed("Error in loginController ------->>> "), error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error:"Internal Server Error !!"
    });
  }
}


// logout controller


export const logoutController = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production", // optional for HTTPS enforcement
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully !!",
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
    console.log(
      chalk.bgRed(
        "Error in logoutController in auth.controller.js ---->> ",
        error
      )
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error:"Internal Server Error" });
  }
};



// Get profile controller
export const getProfileController = async (req, res) => {
  try {
    const { userId, accountType } = req.user;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error in getProfileController --->", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};