import Category from "@/lib/model/category";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectMongoDB();
    const categories = await Category.find();
    return NextResponse.json({
      data: categories,
      status: "success",
      code: 200,
    });
  } catch (e) {
    return NextResponse.json({
      message: e.message,
      status: "failed",
      code: 404,
    });
  }
};

export const POST = async (req, res) => {
  try {
    const data = await req.json();
    await connectMongoDB();
    await Category.create(data);
    return NextResponse.json({
      message: "Category created successfully",
      status: "success",
      code: 200,
    });
  } catch (e) {
    return NextResponse.json({
      message: e.message,
      status: "failed",
      code: 404,
    });
  }
};

// delete
export const DELETE = async (req, res) => {
  try {
    const id = await req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Category deleted successfully",
      status: "success",
      code: 200,
    });
  } catch (e) {
    return NextResponse.json({
      message: e.message,
      status: "failed",
      code: 404,
    });
  }
};
