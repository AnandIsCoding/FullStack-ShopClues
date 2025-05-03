import express from 'express'
import cors from 'cors'
import chalk from 'chalk'   // Chalk for colored console logs
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()

import connectToDb from './configs/database.config.js';
import connectToCloudinary from '../server/configs/cloudinary.config.js'
import userRouter from './routes/auth.route.js';
import categoryRouter from './routes/category.route.js';
import adminRouter from './routes/admin.route.js';

const app = express()

//Cloudinary configuration

connectToCloudinary()
.then(() => console.log(chalk.bgYellow('Connected to Cloudinary successfully ✅ ✅ ')))
.catch((error) => console.error(chalk.bgRed('�� Error in connecting to Cloudinary :'+ error.message)));


// SERVER PORT 
const PORT = process.env.SERVER_PORT || 7000

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// cookie parser middleware
app.use(cookieParser());

// CORS configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000", "http://localhost:7000"];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));


// routes
app.use('/api/v1/user', userRouter)

app.use('/api/v1/category',categoryRouter)

app.use('/api/v1/admin', adminRouter)


// database connection
connectToDb().then(()=>{
    console.log(chalk.bgMagenta('Connected to MongoDB Database successfully ✅ ✅ '))
    app.listen(PORT,()=>{
        console.log(chalk.bgGreenBright(`🚀 Server is listening at http://localhost:${PORT}`))
    })
}).catch((error)=>{
    console.error(chalk.bgRed('❌Error in connecting to MongoDB Database :'+ error.message))
    process.exit(1)  // exit the process with an error status code 1
})

app.get('/',(req,res)=>{
    return res.status(200).json({message:'Now Start Building controllers'})
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});