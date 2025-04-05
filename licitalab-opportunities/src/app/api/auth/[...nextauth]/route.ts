import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const getApiUrl = () => {
  if (process.env.DOCKER_ENVIRONMENT === "true") {
    return "http://backend:4000/api/auth/login";
  }

  return `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const apiUrl = getApiUrl();
          console.log(`🔐 Intentando autenticar con: ${apiUrl}`);

          const response = await axios.post(apiUrl, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (response.data.user) {
            return {
              id: response.data.user.id,
              name: response.data.user.name,
              email: response.data.user.email,
              role: response.data.user.role,
            };
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
