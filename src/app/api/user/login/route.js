import User from "@/lib/model/user";
import connectMongoDB from "@/lib/mongodb";
import { CreateToken } from "@/utility/JWTTokenHelper";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    // Parse request body as JSON
    const data = await req.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Find user by phone number
    const user = await User.findOne({
      email: data.email,
      password: data.password,
    });

    if (!user) {
      // User not found
      return NextResponse.json({
        status: "error",
        code: "404",
        message: "User not found",
      });
    } else {
      let token = await CreateToken(user["email"], user["id"], user["role"]);
      let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const cookieString = `token=${token}; expires=${expireDuration.toUTCString()} ;path=/`;
      return NextResponse.json(
        { status: "success", message: "Login Success", data: token, user },
        { status: 200, headers: { "set-cookie": cookieString } }
      );
    }

    // User found, return success response with user data
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: "failed",
      code: 404,
    });
  }
};
