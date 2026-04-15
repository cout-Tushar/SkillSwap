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

  // get all requests involving this user
  const requests = await RequestModel.find({
    $or: [
      { sender_id: userId },
      { receiver_id: userId }
    ]
  });

  // collect all other user ids
  const otherUserIds = requests.map((r) =>
    r.sender_id === userId ? r.receiver_id : r.sender_id
  );

  // fetch those users
  const users = await User.find({ _id: { $in: otherUserIds } });

  // map userId -> user
  const userMap = new Map(
    users.map((u) => [u._id.toString(), u])
  );

  // build Match[]
  const matches: Match[] = requests.map((r) => {
    const otherUserId =
      r.sender_id === userId ? r.receiver_id : r.sender_id;

    const otherUser = userMap.get(otherUserId);

    return {
      id: r._id.toString(),
      name: otherUser?.name || "Unknown",
      avatar: otherUser?.avatar || "", // adjust field name if different
      skill: r.skillOffered, // or skillNeeded based on your logic
      rating: otherUser?.rating || 0, // fallback if not present
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