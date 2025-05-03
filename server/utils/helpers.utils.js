import { v2 as cloudinary } from "cloudinary";

// helper function to upload file to cloudinary
export const uploadFileToCloudinary = async (imagePath, folder) => {
    const options = { folder };
    return await cloudinary.uploader.upload(imagePath, options); 
};

// take type of file and array of supportedtypes, and return true or false, if supported (filetype is included in supportedTypes array) than true otherwise false
export const isFileTypeSupported = (type, supportedTypes) =>{
    return supportedTypes.includes(type) 
}