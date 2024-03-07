import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";
import NextAuth from "next-auth/next";
import bcryptjs from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/MongoDBAdapter";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30*24*60*60,
    updateAge: 24*60*60,
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const formEmail = credentials?.email;
        const plainPassword = credentials?.password;
        await dbConnect();
        const isUserExist = await User.findOne({ email: formEmail });
        if (!isUserExist) {
          return null;
        }
        const isValidPassword = await bcryptjs.compare(
          plainPassword,
          isUserExist?.password
        );
        if (!isValidPassword) {
          return null;
        }
        return {
          id: isUserExist?._id,
          name: isUserExist?.name || "Anonymous",
          email: isUserExist?.email,
        };
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
