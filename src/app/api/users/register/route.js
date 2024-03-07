import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    const reqBody = await req.json();
    const { name, email, password } = reqBody;
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "Please provide all fields",
        },
        { status: 400 }
      );
    }

    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      return NextResponse.json(
        {
          message: "User already exist",
        },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const savedUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    console.log("reqBody", savedUser);

    return NextResponse.json({
      message: "user created successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
