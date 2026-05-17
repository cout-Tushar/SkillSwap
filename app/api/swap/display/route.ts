import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/model/User";
import RequestModel from "@/model/Request";

interface Match {
  id: string;
  name: string;
  avatar: string;
  skill: string[];
  rating: number;
  status: "pending" | "active" | "completed";
}

export async function GET(req: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = user._id.toString();

  // ✅ ONLY requests where current user is RECEIVER
  const requests = await RequestModel.find({
    receiver_id: userId
  });

  // ✅ collect sender ids
  const senderIds = requests.map((r) => r.sender_id);

  // ✅ fetch sender users
  const users = await User.find({ _id: { $in: senderIds } });

  // ✅ map senderId -> user
  const userMap = new Map(
    users.map((u) => [u._id.toString(), u])
  );

  // ✅ build Match[]
  const matches: Match[] = requests.map((r) => {
    const sender = userMap.get(r.sender_id);

    return {
      id: r._id.toString(),
      name: sender?.name || "Unknown",
      avatar: sender?.avatar || "",
      skill: r.skillOffered,
      rating: sender?.rating || 0,
      status:
        r.status === "accepted"
          ? "active"
          : r.status === "pending"
          ? "pending"
          : "completed",
    };
  });

  return NextResponse.json(matches, { status: 200 });
}