import RequestModel from "@/model/Request";
import User from "@/model/User";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Get single user (NOT array)
    const user = await User.findOne({
      email: session.user.email,
    }).select("_id");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    console.log("Received Swap Request Data:", body);

    // ✅ Create request properly
    const newRequest = new RequestModel({
      sender_id: user._id,
      receiver_id: body.receiver_id,
      skillOffered: body.skillOffered,
      skillNeeded: body.skillWanted,
      status: body.status || "pending",
      message: body.message,
    });

    await newRequest.save();

    return NextResponse.json(
      { message: "Request created successfully", data: newRequest },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error saving request data" },
      { status: 500 }
    );
  }
}