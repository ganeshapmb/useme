'use client'
import React from 'react'
import {Navigation,Pagination,Scrollbar, Autoplay} from 'swiper/modules'
import Ally from 'swiper/modules'
import {Swiper,SwiperSlide} from 'swiper/react'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image'
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import Link from 'next/link'

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


export default async function TrendingProducts () {
    const products:any = await getproducts();
  return (
    <>
    <div className='flex justify-between items-center mb-3'>
        <p>Trending Products</p>
        <div className='px-4'><ArrowCircleRightRoundedIcon/></div>
    </div>
        <Swiper 
            modules={[Navigation,Pagination,Scrollbar,Autoplay]}
            spaceBetween={15}
            breakpoints={{
                576:{
                    slidesPerView:1,
                    spaceBetween:20
                },
                600:{
                    slidesPerView:2,
                    spaceBetween:20
                },
                700:{
                    slidesPerView:3,
                    spaceBetween:20
                },
                1024:{
                    slidesPerView:4,
                    spaceBetween:20
                }
            }}
            navigation
            pagination={{clickable:true}}
            onSwiper={(swiper)=>console.log(swiper)}
            onSlideChange={()=> console.log('slide change')}
            autoplay={{delay:3000}}
            className='mt-5'
            >
                <div className='text-center'>
                    {products && products.length > 0 ? (
                        products.map((item:any)=>{
                            return (<SwiperSlide style={{transform:'translateY(0%)'}} key ={item._id}>
                                <div className='swiper-inner'>
                                    <Link href={`${process.env.HOST}/product/${item.slug}`}>
                                        <Image className='rounded-2xl shadow-lg' src={item.CoverImageUrl} width={2250} height={1390} alt={item.name}/>
                                    </Link>
                                </div>
        
                            </SwiperSlide>)
                        })
                    ): (<div>No data</div>)}

                    
                </div>

        </Swiper>
    </>
  )
}
