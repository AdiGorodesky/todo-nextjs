import connectMongo from "@/lib/db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongo();
    const { email, password } = await req.json();
    console.log({ email, password });
    const user = await UserModel.findOne({ email });
    return NextResponse.json({ message: "success" });
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
