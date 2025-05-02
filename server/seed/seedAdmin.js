import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import dotenv from 'dotenv'
dotenv.config()

const seedAdmin = async () => {
  await mongoose.connect(process.env.DATABASE_URI);

  const existingAdmin = await User.findOne({ accountType: 'admin' });

  if (existingAdmin) {
    console.log(chalk.bgRed('Admin already exists:'), existingAdmin.email);
  } else {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      userName: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      accountType: 'admin'
    });

    await adminUser.save();
    console.log(chalk.bgGreenBright('Admin created Successfully : ---->> '), adminUser);
  }

  mongoose.disconnect();
};

seedAdmin();
