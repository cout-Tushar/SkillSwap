import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import User from "@/model/User";
import bcrypt from "bcryptjs";





export async function POST(req:Request) {
    await connectToDatabase();
    const {email,password}= await req.json();

    if(!email || !password){
        return NextResponse.json({message:"Email and password are required"}, {status:400})
    }
    const existingUser= await User.findOne({email});
    if(existingUser){
        return NextResponse.json({message:"User already exists"}, {status:400})
    }
    const hashedPassword= await bcrypt.hash(password, 10);
    const newUser= new User({
        email,
        password:hashedPassword,
        name:email.split("@")[0],
        bio:"",
        skillsOffered:[],
        skillsNeeded:[],
    });
    await newUser.save();
    return NextResponse.json({message:"User created successfully"}, {status:201})
}