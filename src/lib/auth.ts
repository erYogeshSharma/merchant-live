import { NextAuthOptions, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import dbConnect from "./connect_db";
import { UserModel } from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authConfig: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/dashboard",
    signOut: "/",
    error: "/auth/error",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        isSignUp: {},
        email: {},
        name: {},
        password: {},
      },
      async authorize(credentials, request) {
        try {
          await dbConnect();
          const userExists = await UserModel.findOne({
            email: credentials?.email,
          });

          if (
            credentials?.isSignUp === "false" &&
            userExists.authType === "google"
          ) {
            throw new Error("User already exists with google account");
          }

          const hashPassword = await bcrypt.hash(
            credentials?.password as string,
            10
          );

          if (credentials?.isSignUp === "true") {
            if (userExists) {
              throw new Error("User already exists");
            }
            const emailVerifyToken = jwt.sign(
              { _id: credentials.email, iss: "NODEAPI" },
              process.env.EMAIL_VERIFY_SECRET
            );
            const user = {
              email: credentials?.email,
              name: credentials?.name,
              authType: "credentials",
              verified: false,
              password: "",
              emailVerifyToken: "",
            };
            user.password = hashPassword;
            user.emailVerifyToken = emailVerifyToken;
            const newUser = await UserModel.create(user);
            return newUser;
          } else {
            if (userExists) {
              const doesPasswordMatch = await bcrypt.compare(
                credentials?.password as string,
                userExists.password
              );
              if (!doesPasswordMatch)
                throw new Error("Password does not match");

              return userExists;
            } else {
              throw new Error("No acount found with this email address");
            }
          }
        } catch (error) {
          throw error;
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
      profile(profile, tokens) {
        return {
          ...profile,
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          profilePicUrl: profile.picture, // Add the missing property
          verified: true, // Add the missing property
          authType: "google", // Add the missing property
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        await dbConnect();
        const userExists = await UserModel.findOne({ email: user.email });
        if (userExists) {
          user.id = userExists._id;
          return true;
        } else {
          const newUser = await UserModel.create({
            email: user.email,
            name: user.name,
            profilePicUrl: user.image,
            authType: "google",
            verified: true,
          });
          user.id = newUser._id;
          return true;
        }
      }
      return true;
    },

    //Add Mongo Id and profilePicUrl to the token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profilePicUrl = token.profilePicUrl || token.picture;
      }
      return token;
    },

    //Add profilePicUrl to the session
    async session({ session, token }) {
      session.user.profilePicUrl = token.profilePicUrl as string;
      session.user.id = token.id as string;
      return session;
    },
  },
};
