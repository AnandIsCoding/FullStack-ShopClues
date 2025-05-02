import multer from 'multer'

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'uploads/')
    // },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer(
    {
            storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
    }
)

export default upload;




//  notes :
//  Multer is a middleware for handling file uploads in Node.js with Express. It allows users to upload images, PDFs, and other files to your server.
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

// Inside diskStorage:
// filename: function (req, file, cb) { ... }
// This function defines how the file should be named when saved.
// Date.now() + '-' + file.originalname:
// Adds a timestamp (Date.now()) to the original filename to avoid duplicate file names.
// Example:
// If a user uploads "image.jpg" at 5:30 PM, the stored file might be: 1718548200000-image.jpg
// This ensures each uploaded file has a unique name.