import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/model/User";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ bio: user.bio, name: user.name });

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const { bio, name } = await req.json();

    if (!email || !bio || !name) {
      return NextResponse.json(
        { message: "Email, bio and name are required" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email },
      { bio, name },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Bio updated successfully" });

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}