// {red:{size:{slug}}}
import { NextResponse,NextRequest } from "next/server";
import Product from "@/models/Products";
import connectDb from "@/middlewares/mongoose";

export async function GET(request:NextRequest,content:any) {
    await connectDb();
    let product = await Product.findOne({slug:content.params.id});
    let variants = await Product.find({name:product?.name});
    interface ColorSizeSlug {
        [key: string]: {
          [key: string]: { slug: string }
        }
      }
    let colorSizeSlug:ColorSizeSlug={};// {red:{size:{slug}}}
    if(!Array.isArray(variants)){
        variants=[];
    }
    for (let item of variants){
        // append
        let color:string = item.color
        let size:string= item.size
        if(Object.keys(colorSizeSlug).includes(color)){
            colorSizeSlug[color][size] = {slug:item.slug}
        }
        else{
            // add
            colorSizeSlug[color]={}
            colorSizeSlug[color][size] = {slug:item.slug}
        }
    }
    return NextResponse.json({success:true,product:JSON.parse(JSON.stringify(product)), variants:JSON.parse(JSON.stringify(colorSizeSlug))});

}