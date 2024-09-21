import connectMongoDB from "@/lib/mongodb";
import { headers } from "next/headers";
import User from "@/lib/model/user";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    let headerList = headers();
    let id = headerList.get("id");
    await connectMongoDB();
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({
        status: "fail",
        code: "400",
        message: "user not found",
      });
    } else {
      return NextResponse.json({
        status: "success",
        code: "200",
        data: user,
      });
    }
  } catch (e) {
    return NextResponse.json({
      status: "fail",
      code: "400",
      message: e.message,
    });
  }
};
