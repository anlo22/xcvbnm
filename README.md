# Dr. Raneem's Cosmetics & Skin Care E-Commerce Platform

A bilingual (English/Arabic) Next.js e-commerce application for cosmetics products and skin care courses with a comprehensive admin dashboard.

## Features

- 🌐 **Bilingual Support**: Full English and Arabic language support with RTL layout
- 🛍️ **Products Management**: Display and manage cosmetics products
- 📚 **Courses Management**: Display and manage skin care courses
- 🔐 **Admin Dashboard**: Secure admin panel with authentication
- 📱 **Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS
- 🎨 **Beautiful Theme**: Soft pink and blue color scheme perfect for beauty products

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS
- **Form Validation**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB instance)
- npm or yarn package manager

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
```

To generate a `NEXTAUTH_SECRET`, you can use:
```bash
openssl rand -base64 32
```

3. **Create an admin user**:
You'll need to create an admin user in MongoDB. You can use MongoDB Compass or create a script:

```javascript
// scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const Admin = require('./models/Admin').default;

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const hashedPassword = await bcrypt.hash('your_password', 10);
  
  await Admin.create({
    email: 'admin@example.com',
    password: hashedPassword,
  });
  
  console.log('Admin created successfully!');
  process.exit();
}

createAdmin();
```

4. **Run the development server**:
```bash
npm run dev
```

5. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── admin/         # Admin dashboard
│   │   ├── products/      # Products pages
│   │   ├── courses/       # Courses pages
│   │   └── page.tsx       # Homepage
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication
│   │   ├── products/      # Products API
│   │   └── courses/       # Courses API
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer
│   └── ...
├── lib/                   # Utility functions
│   ├── mongodb.ts         # Database connection
│   └── auth.ts            # Auth helpers
├── models/                # MongoDB models
│   ├── Product.ts
│   ├── Course.ts
│   └── Admin.ts
├── messages/              # Translation files
│   ├── en.json
│   └── ar.json
└── middleware.ts          # i18n middleware
```

## Usage

### Adding Products

1. Log in to the admin dashboard at `/admin`
2. Navigate to "Manage Products"
3. Click "Add Product"
4. Fill in the form with bilingual content
5. Save the product

### Adding Courses

1. Log in to the admin dashboard at `/admin`
2. Navigate to "Manage Courses"
3. Click "Add Course"
4. Fill in the form with bilingual content
5. Save the course

### Language Switching

Users can switch between English and Arabic using the language switcher in the header. The layout automatically adjusts for RTL when Arabic is selected.

## API Routes

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a product (admin only)
- `GET /api/products/[id]` - Get a single product
- `PUT /api/products/[id]` - Update a product (admin only)
- `DELETE /api/products/[id]` - Delete a product (admin only)

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a course (admin only)
- `GET /api/courses/[id]` - Get a single course
- `PUT /api/courses/[id]` - Update a course (admin only)
- `DELETE /api/courses/[id]` - Delete a course (admin only)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    // Your primary colors (pink theme)
  },
  secondary: {
    // Your secondary colors (blue theme)
  },
}
```

### Translations

Edit files in `messages/` directory to customize translations:
- `messages/en.json` - English translations
- `messages/ar.json` - Arabic translations

## Security Notes

- Admin routes are protected by NextAuth authentication
- Passwords are hashed using bcrypt
- API routes validate admin authentication
- Environment variables should never be committed to version control

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.

