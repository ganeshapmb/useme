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


const Slider = () => {
  return (
    <>
        <Swiper 
            modules={[Navigation,Pagination,Scrollbar,Autoplay]}
            spaceBetween={10}
            slidesPerView={1.5}
            // on small screen
            centeredSlides={true}
            breakpoints={{
                0:{
                    slidesPerView:1.15,
                },
                400:{
                    slidesPerView:1.15,
                },
                639:{
                    slidesPerView:1.15,
                },
                865:{
                    slidesPerView:1.15,
                },
                1000:{
                    slidesPerView:1.15,
                },
                1500:{
                    slidesPerView:1.15,
                },
                1700:{
                    slidesPerView:1.15,
                }
            }}
            navigation
            pagination={{clickable:true}}
            // scrollbar={{draggable:true}}
            onSwiper={(swiper)=>console.log(swiper)}
            onSlideChange={()=> console.log('slide change')}
            autoplay={{delay:3000}}
            className='mt-5'
            >
                <div className='text-center'>
                    <SwiperSlide style={{transform:'translateY(0%)'}}>
                        <div className='swiper-inner'>
                            <Image className='rounded-2xl shadow-lg' src={"https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600"} width={2250} height={1390} alt='havells'/>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide style={{transform:'translateY(0%)'}}>
                        <div className='swiper-inner'>
                            <Image className='rounded-2xl shadow-lg' src={"https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=600"} width={2250} height={1390} alt='havells'/>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide style={{transform:'translateY(0%)'}}>
                        <div className='swiper-inner'>
                            <Image className='rounded-2xl shadow-lg' src={"https://images.pexels.com/photos/7546548/pexels-photo-7546548.jpeg?auto=compress&cs=tinysrgb&w=600"} width={2250} height={1390} alt='havells'/>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide style={{transform:'translateY(0%)'}}>
                        <div className='swiper-inner'>
                            <Image className='rounded-2xl shadow-lg' src={"https://images.pexels.com/photos/7061331/pexels-photo-7061331.jpeg?auto=compress&cs=tinysrgb&w=600"} width={2250} height={1390} alt='havells'/>
                        </div>

                    </SwiperSlide>
                </div>

        </Swiper>
    </>
  )
}

export default Slider