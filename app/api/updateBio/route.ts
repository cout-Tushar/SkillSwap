import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/model/User";



export async function GET(req: Request) {
  await connectToDatabase();
 const url= new URL(req.url)
  const email=url.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ bio: user.bio });
}

export async function POST(req:Request){
    await connectToDatabase();
    const url= new URL(req.url)
    const email=url.searchParams.get("email");
    const data = await req.json();
    const { bio } = data;

    if (!email || !bio) {
        return NextResponse.json({ message: "Email and bio are required" }, { status: 400 });
    }

    const result = await User.updateOne({ email }, { $set: { bio } });

    if (result?.matchedCount === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Bio updated successfully" });
}