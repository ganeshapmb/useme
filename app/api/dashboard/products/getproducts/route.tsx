import { NextResponse } from "next/server";
import Product from "@/models/Products";
import connectDb from "@/middlewares/mongoose";

export async function GET(){
    await connectDb();
    let products = await Product.find()
    return NextResponse.json({success:true,products})
}