
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const isProduction = process.env.NODE_ENV !== 'development'

const nextAuthConfig = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      return true
    },
  },
  secret: process.env.NEXT_AUTH_SECRET_KEY
});

export default nextAuthConfig

