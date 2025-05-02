
// Import required modules
import mongoose from 'mongoose'  // Mongoose for MongoDB connection
import chalk from 'chalk';       // Chalk for colored console logs
import dotenv from 'dotenv'     // Dotenv to load environment variables

// Load environment variables from .env file
dotenv.config()

// Get database URI from environment variables
const DATABASE_URI = process.env.DATABASE_URI;

// Function to establish a connection to the MongoDB database

const connectToDb = async() =>{
    try {
        // Attempt to connect to the database with a timeout of 60 seconds
        await mongoose.connect(DATABASE_URI, {serverSelectionTimeoutMS: 60000})
    } catch (error) {
        console.log(chalk.bgRedBright('Error in connectToDb in database.config.js ---->> ',error.message))
        process.exit(1)
    }
}

export default connectToDb
