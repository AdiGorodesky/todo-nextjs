import { NextResponse } from "next/server";
import { getUserByEmail } from "../../../data/User";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log({ email, password });
    const user = await getUserByEmail(email);
    if (user) {
      return NextResponse.json({ message: "success" });
    }
    return NextResponse.json({ error: "User not found" });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {}

export async function PUT() {}

export async function DELETE() {}
