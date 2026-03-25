import User from "@/model/User";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectToDatabase();

    // ✅ Get session from your existing auth setup
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const users = await User.find({
      email: { $ne: session.user.email }
    }).select("-password");

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}