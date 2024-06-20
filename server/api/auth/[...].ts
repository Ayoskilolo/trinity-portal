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
      async authorize(credentials: {
        role: string;
        matricNumber?: string;
        email: string;
        password: string;
      }) {
        try {
          let user;
          switch (credentials.role) {
            case "student":
              user = await prisma.student.findUnique({
                where: {
                  matricNumber: String(credentials.matricNumber),
                },
              });
              console.log(user);
              break;

            case "doctor":
              user = await prisma.doctor.findFirst({
                where: {
                  email: String(credentials.email),
                },
              });
              break;

            case "nurse":
              user = await prisma.nurse.findFirst({
                where: {
                  OR: [
                    {
                      userName: credentials.email,
                    },
                    {
                      email: credentials.email,
                    },
                  ],
                },
              });
              break;
          }

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
          const userInfo = { ...userDetails, role: credentials.role };

          return userInfo;
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
