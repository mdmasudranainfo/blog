import User from "@/lib/model/user";
import connectMongoDB from "@/lib/mongodb";

const { NextResponse } = require("next/server");

export const GET = async (req, res) => {
  try {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({
      data: users,
      status: "success",
      code: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: "failed",
      code: 404,
    });
  }
};

export const POST = async (req, res) => {
  try {
    const data = await req.json();
    // connect to server
    await connectMongoDB();
    const result = await User.create(data);
    return NextResponse.json({
      message: "User register successfully",
      status: "success",
      code: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: "failed",
      code: 404,
    });
  }
};
