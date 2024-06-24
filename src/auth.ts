import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/User";
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("this is credentials:", credentials);
        const { email, password } = credentials;
        const user = await getUserByEmail(email as string);
        console.log(user);

        if (!user || !user.password) return null;
        const passwordMatch = await bcrypt.compare(
          password as string,
          user.password
        );
        console.log({ passwordMatch });

        if (passwordMatch) return user;

        return null;
      },
    }),
  ],
});
