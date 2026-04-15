import User from "@/model/User";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ userid: string }> } 
) {
  try {
    await connectToDatabase();

    const { userid } = await context.params; 

    console.log("USERID:", userid);

    if (!userid) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

   const user = await User.findById(userid).select("skillsOffered");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}