import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    minLength: [2, 'Category name must be at least 2 characters long']
  },
  thumbnail:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required:true,
    trim: true
  }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
