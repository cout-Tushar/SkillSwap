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
  const user=await User.findOne({email});
  if(!user){
    return NextResponse.json({message:"User not found"}, {status:404})
  }
  return NextResponse.json({
    skillsOffered: user.skillsOffered,
    skillsNeeded: user.skillsNeeded,
  });
}

export async function DELETE(req: Request) {
  await connectToDatabase();
  const url= new URL(req.url) 
  const email=url.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }
  const data= await req.json();
  const { skillId,type } = data;
  if (!skillId || !type) {
    return NextResponse.json(
      { message: "Skill ID and type are required" },
      { status: 400 }
    );
  }
let result;

if (type === "teaching") {
  result = await User.updateOne(
    { email, "skillsOffered.skillId": skillId },
    { $pull: { skillsOffered: { skillId: skillId } } }
  );
} else if (type === "learning") {
  result = await User.updateOne(
    { email, "skillsNeeded.skillId": skillId },
    { $pull: { skillsNeeded: { skillId: skillId } } }
  );
}
return NextResponse.json({ message: "Skill deleted successfully" });
}


export async function POST(req: Request) {
  await connectToDatabase();

  const data = await req.json();
  console.log(data);
  const { email, name, level, type, skillId } = data;
  console.log(type);

  if (!email || !name || !level || !type) {
    return NextResponse.json(
      { message: "Email, name, level, and type are required" },
      { status: 400 }
    );
  }

  let result;

  if (type === "teaching") {
    result = await User.updateOne(
      { email },
      { $push: { skillsOffered: { skill: name, level: level, skillId: skillId } } }
    );
  } 
  else if (type === "learning") {
    result = await User.updateOne(
      { email },
      { $push: { skillsNeeded: { skill: name, level: level, skillId: skillId } } }
    );
  }
  console.log(result);
  if (result?.matchedCount === 0) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Skill received successfully",
  });
}