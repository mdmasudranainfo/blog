import connectMongoDB from "@/lib/mongodb";
import Category from "@/lib/model/category";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {
  try {
    const id = params.id;
    await connectMongoDB();
    const category = await Category.findOne({ _id: id });

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

export const PUT = async (req, { params }) => {
  try {
    const data = await req.json(); // Get the updated data from the request body
    const id = new ObjectId(params.id); // Convert the id to ObjectId
    await connectMongoDB();

    // Find the category by id and update it with the new data
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id }, // Find the document by id
      { $set: data }, // Update the document with new data
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return NextResponse.json({
        message: "Category not found",
        status: "failed",
        code: 404,
      });
    }

    return NextResponse.json({
      message: "Category updated successfully",
      status: "success",
      code: 200,
      data: updatedCategory,
    });
  } catch (e) {
    return NextResponse.json({
      message: e.message,
      status: "failed",
      code: 500,
    });
  }
};
