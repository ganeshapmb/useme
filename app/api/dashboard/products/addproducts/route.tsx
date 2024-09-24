import { NextResponse,NextRequest } from "next/server";
import Product from "@/models/Products";
import connectDb from "@/middlewares/mongoose";

export async function POST(request:NextRequest){
    await connectDb();
    let payload = await request.json();
    let p = new Product({
        name:payload.name,
        slug:payload.slug,
        Description:payload.Description,
        IsFeatured:payload.IsFeatured,
        CategoryID:payload.CategoryID,
        Discount:payload.Discount,
        Price:payload.Price,
        Quantity:payload.Quantity,
        Summary:payload.Summary,
        CoverImageUrl:payload.CoverImageUrl,
        size:payload.size,
        color:payload.color
    });
    await p.save();
    return NextResponse.json({success:true});
}