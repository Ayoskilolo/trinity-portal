import { NuxtAuthHandler } from "#auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/prisma/db";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,

  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      credentials: {},
      async authorize(credentials: { email: string; password: string }) {
        try {
          const users = await prisma.user.findMany({
            where: {
              userName: credentials.email,
            },
          });

          const user = users[0];

          if (!user) {
            throw createError({
              statusCode: 401,
              statusMessage: "Unauthorised",
            });
          }

          const isPasswordRight = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordRight) {
            throw createError({
              statusCode: 401,
              statusMessage: "Unauthorised",
            });
          }

          const { password, ...userDetails } = user;

          return userDetails;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user,
      };

      return session;
    },
  },
});
