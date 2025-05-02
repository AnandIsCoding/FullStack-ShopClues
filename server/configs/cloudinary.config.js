// Import necessary modules
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import chalk from "chalk";

dotenv.config();

// Function to establish a connection with Cloudinary
const connectToCloudinary = async() => {
  try {
    // Configure Cloudinary with credentials from environment variables
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,// Cloudinary cloud name
      api_key: process.env.CLOUDINARY_API_KEY,// Cloudinary API key
      api_secret: process.env.CLOUDINARY_API_SECRET_KEY, // Cloudinary API secret key
      
    });
  } catch (error) {
     // Log an error message in red if connection fails
    console.error(chalk.redBright('Error in connectToCloudinary in cloudinary.config.js ---->> ',error.message));
  }
};


export default connectToCloudinary