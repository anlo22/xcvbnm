const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, {
  timestamps: true,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = process.argv[2] || 'admin@example.com';
    const password = process.argv[3] || 'admin123';

    const hashedPassword = await bcrypt.hash(password, 10);

    // If admin exists, reset the password to the provided value.
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log('Admin password reset successfully!');
      console.log('Email:', existingAdmin.email);
      process.exit(0);
    }

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log('Admin created successfully!');
    console.log('Email:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();

