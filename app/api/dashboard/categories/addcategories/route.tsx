import { NextResponse,NextRequest } from "next/server";
import Category from "@/models/Category";
import connectDb from "@/middlewares/mongoose";

export async function POST(request:NextRequest){
    await connectDb();
    let payload = await request.json();
    let p = new Category({
        name:payload.name,
        slug:payload.slug,
        parentCategory:payload.parentCategory,
        IsFeatured:payload.IsFeatured,
        ImageUrl:payload.ImageUrl,
        Description:payload.Description
    });
    await p.save();
    return NextResponse.json({success:true});
}