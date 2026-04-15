import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import RequestModel from "@/model/Request";
import User from "@/model/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const receiverId = searchParams.get("receiverId");
   

    if (!receiverId || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return NextResponse.json({ message: "Invalid receiverId" }, { status: 400 });
    }

    // get sender (logged-in user)
    const sender = await User.findOne({ email: session.user.email }).select("_id");
    console.log("Sender:", sender?._id);

    if (!sender) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // check if request exists
    const exists = await RequestModel.exists({
      sender_id: sender._id,
      receiver_id: receiverId,
    });

    console.log(exists ? "Swap request exists" : "No swap request found");

    return NextResponse.json({ exists: !!exists });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error checking swap requests" },
      { status: 500 }
    );
  }
}