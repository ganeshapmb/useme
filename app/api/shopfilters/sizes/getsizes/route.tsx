// app/api/products/route.ts
import { NextResponse } from 'next/server';
import connectDb from "@/middlewares/mongoose";
import Product from "@/models/Products";

export async function GET(req: Request) {
  const sizes = await Product.distinct('size', { size: { $ne: null } });
//   console.warn("colors",sizes)

  return NextResponse.json({success:true,sizes});
}
