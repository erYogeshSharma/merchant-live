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
// import { useSession } from "next-auth/react";

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
      authorize: function (credentials, request): Awaitable<User | null> {
        console.log(credentials);
        throw new Error("Function not implemented.");
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account, profile, email, credentials });
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
