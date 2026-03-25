import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectToDatabase } from "@/lib/mongodb";


export async function GET(request: Request) {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (!email) {
        return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }  
    const skillsTeaching = user.skillsOffered.length;
    const skillsLearning = user.skillsNeeded.length;
    return NextResponse.json({ skillsTeaching, skillsLearning });

    
}