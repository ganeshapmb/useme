// app/api/products/route.ts
import { NextResponse } from 'next/server';
import connectDb from "@/middlewares/mongoose";
import Product from "@/models/Products";
import Category from '@/models/Category';


// searchParams URLSearchParams {
//   'categories' => 'Wall Lights',
//   'brand' => '',
//   'gender' => 'undefined',
//   'discount' => 'undefined',
//   'size' => '',
//   'color' => '',
//   'price' => 'undefined' }




export async function GET(req: Request) {
  const categoryIds=[];
  const { searchParams } = new URL(req.url);
  console.warn("searchParams",searchParams)
  await connectDb();

  const filter: any = {};
  const categoryNames = searchParams.getAll('categories');
  console.warn(categoryNames,"categoryNames")
  const categoryParam = searchParams.get('categories');
  if (categoryNames.length >0) {
    // const categoryNames = categoryParam.split(',');
    console.warn(categoryNames,"categoryNames")
    const formattedCategoryNames = categoryNames.map(name => name.replace(/_/g, ' '));
    console.warn(formattedCategoryNames,"formattedCategoryNames")
    const categories = await Category.find({ name: { $in: formattedCategoryNames } });
    const categoryIds = categories.map(category => category._id);
    filter.CategoryID = { $in: categoryIds }; // Use the category _id(s) in the product filter
  }
  const sizeNames = searchParams.getAll('size');
  if (sizeNames.length > 0) {
    filter.size = { $in: sizeNames }; 
  }
  const colorNames = searchParams.getAll('color');
  if (colorNames.length > 0) {
    filter.color = { $in: colorNames }; 
  }


  const initialproducts = await Product.find(filter);
  // console.warn("products",initialproducts)
  let products:any ={}
  for(let item of initialproducts){
    if(item.name in products){
      if(!products[item.name].color.includes(item.color)){
        products[item.name].color.push(item.color)
      }
      if(!products[item.name].size.includes(item.size)){
        products[item.name].size.push(item.size)
      }
    }
    else{
      products[item.name] = JSON.parse(JSON.stringify(item));
      products[item.name].color = [item.color]
      products[item.name].size=[item.size]
    }
  }
  // console.warn("products",products)
  // Get 'page' from searchParams, default to 1
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Get 'pageSize' from searchParams, default to 6
  const pageSize = parseInt(searchParams.get('pageSize') || '3', 10);

  // Convert products object back to an array for pagination
  const productsArray = Object.values(products);
  // console.warn(productsArray,"productsArray")

  // Calculate the total number of products (before pagination)
  const totalCount = productsArray.length;

  // Apply pagination using .skip() and .limit()
  const paginatedProducts = productsArray
    .slice((page - 1) * pageSize, page * pageSize);

  // console.warn("finalproducts",paginatedProducts)

  // return NextResponse.json(products);
  return NextResponse.json({
    products: paginatedProducts,
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / pageSize),
  });
}
