import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        await connectDB();
        const admin = await Admin.findOne({ email });

        if (!admin) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          admin.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: admin._id.toString(),
          email: admin.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/en/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

