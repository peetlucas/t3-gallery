import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { env } from '@/env'; 
import { type NextApiRequest, type NextApiResponse } from 'next';

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
