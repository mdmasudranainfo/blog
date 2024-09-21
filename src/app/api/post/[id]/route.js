import Post from "@/lib/model/post";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const id = params.id;
    await connectMongoDB();
    const category = await Post.findOne({ _id: id });

    return NextResponse.json({
      status: "success",
      code: "200",
      data: category,
    });
  } catch (e) {
    return NextResponse.json({
      status: "fail",
      code: "500",
      message: e.message,
    });
  }
};
