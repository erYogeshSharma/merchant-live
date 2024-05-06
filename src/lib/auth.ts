import NextAuth, {
  Awaitable,
  NextAuthOptions,
  RequestInternal,
  User,
  getServerSession,
} from "next-auth";
import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect, useRouter } from "next/navigation";
import { User as UserModel } from "@/models/user";
import dbConnect from "./connect_db";
// import { useSession } from "next-auth/react";
import bcrypt from "bcrypt";
export const authConfig: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.AUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        await dbConnect();
        try {
          const user = await UserModel.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password as string
          );
          if (!passwordMatch) {
            return null as any;
          }

          return {
            email: user.email,
            name: user.name,
            profilePic: user.profilePicUrl,
            _id: user._id,
          };
        } catch (err: any) {
          console.log("Error", err);
          throw new Error(err);
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account });
      return true;
    },
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

// export function loginIsRequiredClient() {
//   if (typeof window !== "undefined") {
//     const session = useSession();
//     const router = useRouter();
//     if (!session) router.push("/");
//   }
// }
