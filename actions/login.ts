"use server";

import * as z from "zod";
import { LoginSchema } from "../schemas";
import axios from "axios";

const URL = "http://localhost:3000";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  await axios.post(`${URL}/api/login`, validatedFields.data);

  return { success: "Email sent" };
};
