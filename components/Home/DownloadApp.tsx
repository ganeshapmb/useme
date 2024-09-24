import React from 'react'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import AppleIcon from '@mui/icons-material/Apple';

const DownloadApp = () => {
  return (
    <>
        <section className='text-gray-600 body-font rounded-xl border shadow-md m-5'>
            <div className='container px-5 py-24 mx-auto flex items-center md:flex-row flex-col'>
                <div className='flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center'>
                    <h2 className='text-xs text-pink-500 tracking-widest font-medium title-font mb-1'>
                        Smealless App
                    </h2>
                    <h1 className='md:text-3xl text-2xl font-medium title-font text-gray-900'>Download the App</h1>
                </div>
                <div className='flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4'>
                    <button className='bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none'>
                        <ShopTwoIcon/>
                        <span className='ml-4 flex items-start flex-col leading-none'>
                            <span className='text-xs text-gray-600 mb-1'>Get it On</span>
                            <span className='title-font font-medium'>Google Play</span>
                        </span>
                    </button>
                    <button className='bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none'>
                        <AppleIcon/>
                        <span className='ml-4 flex items-start flex-col leading-none'>
                            <span className='text-xs text-gray-600 mb-1'>Download On</span>
                            <span className='title-font font-medium'>App Store</span>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    </>
  )
}

export default DownloadApp