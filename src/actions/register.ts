"use server";

import * as z from "zod";
import { RegisterSchema } from "../schemas";
import axios from "axios";

const URL = process.env.APP_URL;

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const res = await axios.post(`${URL}/api/register`, validatedFields.data);
  if (res.data.error) {
    return { error: "User already exist" };
  }

  return { success: "User created" };
};
