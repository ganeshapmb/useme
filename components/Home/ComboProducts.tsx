'use client'
import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

// const getproducts = async()=>{
//     try{
//         let res = await fetch(`${process.env.HOST}/api/dashboard/products/getproducts`,{
//             cache:"no-cache",
//         });
//         let data = await res.json();
//         if(data.success){
//             return data.products;
//         }
//         else{
//             return null;
//         }
//     }
//     catch(error){
//         return null;
//     }
// }
export default function ComboProducts (){
    const [products, setProducts] = useState([])
    useEffect(() => {
      const getproducts = async ()=>{
        let res = await fetch(`${process.env.HOST}/api/dashboard/products/getproducts`);
        let data = await res.json();
        if(data.success){
            setProducts(data.products)
        }

      }
      getproducts();
      
    }, [])
    
    // const products:any = await getproducts();
    return(
    <>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            <div className='bg-gray-300 p-4 h-[33rem]'><p>Wall Lights</p>
            <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-60 h-80 mt-12"
      >
        {products && products.length > 0 ? (
                        products.map((item:any)=>{
                            return (<SwiperSlide className='flex items-center justify-center rounded-lg  text-white text-2xl font-bold' key ={item._id}>
                                <Link href={`${process.env.HOST}/product/${item.slug}`}><Image src={item.CoverImageUrl} layout='fill' alt={item.name}/></Link>
                            </SwiperSlide>)
                        })
                    ): (<div>No data</div>)}     
      </Swiper>
            </div>
            {/* 2nd sec */}
            <div>
                <div className='flex justify-between items-center mb-1.5'>
                    <p>Other Products</p>
                    <div className='px-4 py-2'><ArrowCircleRightRoundedIcon/></div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 h-full xl:h-[25rem] '>
                {products && products.length > 0 ? (
                        products.slice(0, 4).map((item:any)=>{
                            return (<div className='p-1'>
                                <Link href={`${process.env.HOST}/product/${item.slug}`}>
                                    <Image src={item.CoverImageUrl} layout="responsive" height={350} width={350} alt={item.name} className='w-full h-auto'/>
                                </Link>
                            </div>)
                        })
                    ): (<div>No data</div>)}     
                    
                </div>             
            </div>
            {/* 3rd sec */}
            <div className="p-4 h-[30rem] relative"><Image src={'https://images.pexels.com/photos/915051/pexels-photo-915051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} layout='fill' objectFit="cover" alt='meet'/>
                <p className="text-white text-center absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">Your Text Here</p>
                </div>
        </div>
    </>)
}