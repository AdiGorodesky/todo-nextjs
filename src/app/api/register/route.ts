import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "../../../data/User";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const user = await getUserByEmail(email);
    if (user) {
      return NextResponse.json({ error: "User already exist" });
    }
    await createUser(email, password, name);

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
