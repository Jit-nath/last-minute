import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log(
  "Auth Debug - NEXTAUTH_SECRET present:",
  !!process.env.NEXTAUTH_SECRET
);
console.log("Auth Debug - client_id present:", !!process.env.client_id);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.client_id!,
      clientSecret: process.env.client_secret!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Persist user info to the token on initial sign in
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass token info to the session
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
};
