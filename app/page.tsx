import ComboProducts from "@/components/Home/ComboProducts";
import DownloadApp from "@/components/Home/DownloadApp";
import Slider from "@/components/Home/Slider";
import TrendingProducts from "@/components/Home/TrendingProducts";
import Image from "next/image";
import Link from "next/link";

const getproducts = async()=>{
    try{
        let res = await fetch(`${process.env.HOST}/api/dashboard/products/getproducts`,{
            cache:"no-cache",
        });
        let data = await res.json();
        if(data.success){
            return data.products;
        }
        else{
            return null;
        }
    }
    catch(error){
        return null;
    }
}

export default async function Home() {
  const products =await getproducts();
  return (
    <>
      {/* <h1 className="text-red-500">Meet</h1> */}
      {/* Slider- Sweper React material ui
      Listing
      Info Download app
      Slider small
      Instagram

    */}

    <Slider/>

      {/* Listing */}
      <section className="flex flex-col items-center bg-white mt-5">
        <h1 className="mt-10 text-4xl font-bold text-gray-800">
          Our Products
        </h1>
        <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-8">




        {products && products.length > 0 ? (
                        products.map((item:any)=>{
                            return (<article className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
                              <Image src={item.CoverImageUrl} width={500} height={500} alt={item.name} />
                              <div className="p-4">
                                <div className="pb-6">
                                  <Link href={`${process.env.HOST}/product/${item.slug}`} className="text-lg hover:text-pink-600 font-medium duration-500 ease-in-out">{item.name}</Link>
                                </div>
                                <hr/>
                                <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                                  <li className="text-left">
                                    <span className="text-sm text-gray-400">Price</span>
                                    <p className="m-0 text-base font-medium">${item.Price}</p>
                                  </li>
                                </ul>
                              </div>
                            </article>)
                        })
                    ): (<div>No data</div>)} 

          
          {/* Replicate end */}
        </div>

      </section>
      {/* Listing */}

      {/* Info */}
      <DownloadApp/>

      <TrendingProducts/>

      <ComboProducts/>

    </>
  );
}
