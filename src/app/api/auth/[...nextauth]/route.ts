/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import NextAuth, { type NextAuthOptions } from 'next-auth';
// import DiscordProvider from 'next-auth/providers/discord';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import prisma from '../../../../../lib/prisma';
// import { type NextApiHandler } from 'next';

// const authOptions: NextAuthOptions = {
//   providers: [
//     DiscordProvider({
//       clientId: process.env.DISCORD_CLIENT_ID!,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET!,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ session, user }) {
//       if (session.user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
// };

// const handler: NextApiHandler = (req, res) => NextAuth(authOptions)(req, res);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
})