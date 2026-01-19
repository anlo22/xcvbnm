# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   NEXTAUTH_SECRET=your_secret_key_here
   NEXTAUTH_URL=http://localhost:3000
   ```

   To generate `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

3. **Create Admin User**
   
   You need to create an admin user in MongoDB. You can use the provided script:
   ```bash
   node scripts/createAdmin.js admin@example.com your_password
   ```
   
   Or manually create one using MongoDB Compass or a MongoDB client.

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Homepage: http://localhost:3000/en or http://localhost:3000/ar
   - Admin Login: http://localhost:3000/en/admin/login

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to `.env.local`

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/your_database_name`

## Creating Your First Admin User

### Using the Script

```bash
node scripts/createAdmin.js your_email@example.com your_password
```

### Using MongoDB Compass

1. Connect to your MongoDB instance
2. Create a new database (e.g., `cosmetics_db`)
3. Create a collection named `admins`
4. Insert a document:
   ```json
   {
     "email": "admin@example.com",
     "password": "$2a$10$hashed_password_here"
   }
   ```
   
   To hash the password, you can use:
   ```javascript
   const bcrypt = require('bcryptjs');
   const hash = await bcrypt.hash('your_password', 10);
   console.log(hash);
   ```

## Adding Sample Data

### Using the Admin Dashboard

1. Log in to the admin dashboard
2. Navigate to "Manage Products" or "Manage Courses"
3. Click "Add Product" or "Add Course"
4. Fill in the form with bilingual content
5. Save

### Using MongoDB Compass

1. Connect to your database
2. Create collections: `products` and `courses`
3. Insert documents with the following structure:

**Product Example:**
```json
{
  "nameEn": "Anti-Aging Cream",
  "nameAr": "كريم مضاد للشيخوخة",
  "descriptionEn": "Premium anti-aging cream with natural ingredients",
  "descriptionAr": "كريم مضاد للشيخوخة فاخر بمكونات طبيعية",
  "price": 49.99,
  "image": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
  "category": "Skincare",
  "inStock": true
}
```

**Course Example:**
```json
{
  "titleEn": "Advanced Skin Care Techniques",
  "titleAr": "تقنيات متقدمة للعناية بالبشرة",
  "descriptionEn": "Learn professional skin care techniques from experts",
  "descriptionAr": "تعلم تقنيات العناية بالبشرة الاحترافية من الخبراء",
  "price": 199.99,
  "image": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
  "duration": "4 weeks",
  "lessons": 12
}
```

## Troubleshooting

### MongoDB Connection Issues

- Check your connection string in `.env.local`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify your database user credentials

### Authentication Issues

- Make sure `NEXTAUTH_SECRET` is set in `.env.local`
- Verify `NEXTAUTH_URL` matches your current URL
- Check that admin user exists in the database

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## Next Steps

1. Customize the color scheme in `tailwind.config.ts`
2. Update translations in `messages/en.json` and `messages/ar.json`
3. Add your product images (use Cloudinary or similar service)
4. Configure payment integration (Stripe, PayPal, etc.)
5. Set up email notifications
6. Deploy to production (Vercel recommended)

## Production Deployment

### Vercel

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

- `MONGODB_URI`: Your production MongoDB connection string
- `NEXTAUTH_SECRET`: Same secret or generate a new one
- `NEXTAUTH_URL`: Your production URL (e.g., https://yourdomain.com)

## Support

For issues or questions, refer to the main README.md or contact the development team.

