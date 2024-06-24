"use server";

import * as z from "zod";
import { LoginSchema } from "../schemas";
import axios from "axios";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";

const URL = process.env.APP_URL;

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password } = validatedFields.data;
  try {
    // await axios.post(`${URL}/api/login`, validatedFields.data);
    const resultSignIn = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log(resultSignIn);

    if (!resultSignIn) {
      throw new Error("Sign in failed");
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
