import { NextResponse } from "next/server";
import Category from "@/models/Category";
import connectDb from "@/middlewares/mongoose";

export async function GET(){
    await connectDb();
    let categories = await Category.find()
    return NextResponse.json({success:true,categories})
}