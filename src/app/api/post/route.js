import { headers } from "next/headers";
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/lib/model/post";

export const GET = async (req, res) => {
  try {
    await connectMongoDB();
    const posts = await Post.find().sort({ createdAt: -1 });

    return NextResponse.json({
      status: "success",
      code: 200,
      data: posts,
    });
  } catch (e) {
    return NextResponse.json({
      status: "fail",
      code: "400",
      message: e.message,
    });
  }
};

export const POST = async (req, res) => {
  try {
    const data = await req.json();

    // Ensure headers are correctly retrieved
    let headerList = headers();
    let id = headerList.get("id");
    await connectMongoDB();
    console.log(id);

    await Post.create({ ...data, author: id });
    return NextResponse.json({
      status: "success",
      code: "200",
      message: "Post created successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "fail",
      code: "400",
      message: e.message,
    });
  }
};

export const DELETE = async (req, res) => {
  try {
    const id = await req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({
      status: "success",
      code: "200",
      message: "Post deleted successfully",
    });
  } catch (e) {
    return NextResponse.json({
      status: "fail",
      code: "400",
      message: e.message,
    });
  }
};
