// app/api/products/route.ts
import { NextResponse } from 'next/server';
import connectDb from "@/middlewares/mongoose";
import Product from "@/models/Products";

export async function GET(req: Request) {
  const colors = await Product.distinct('color', { color: { $ne: null } });
  console.warn("colors",colors)

  return NextResponse.json({success:true,colors});
}
