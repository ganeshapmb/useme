'use client'
// import { useRouter } from 'next/navigation';
import React, { useState,useEffect,useContext } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { CartContext,CartContextType } from '@/context/CartContext';

interface ProductOneProps{
    productId:string;
}

interface Variants {
  [key: string]: {
    [key: string]: {
      slug: string;
    };
  };
}

const ProductOne : React.FC<ProductOneProps> = ({productId}) => {
    // console.warn("productid",productId);
    const [selectedImage,setSelectedImage] = useState('https://images.pexels.com/photos/717431/pexels-photo-717431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    const [activeIndex,setActiveIndex]= useState(0);
    let [images,setImages]: any =useState(['https://images.pexels.com/photos/717431/pexels-photo-717431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/206557/pexels-photo-206557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1006073/pexels-photo-1006073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']);
    //576w * 362pxh
    const handleImageClick = (image:any,index:any)=>{
        setSelectedImage(image);
        setActiveIndex(index);
    };
    const [product, setProduct] = useState<any>({});
    const [variants, setVariants] = useState<Variants>({});
    const [apnacolor, setApnaColor] = useState('');
    const [size, setSize] = useState('');
    // const router = useRouter();

    // const { addToCart } = useContext(CartContext);
    const cartContext = useContext<CartContextType | undefined>(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  // Destructure the context to get addToCart
  const { addToCart } = cartContext;

    
    useEffect(() => {
      const getproduct = async()=>{
        // debugger
        let res = await fetch(`${process.env.HOST}/api/dashboard/products/getsingleproduct/${productId}`);
        let data: any = await res.json();
        if(data && data.variants && typeof data.variants === 'object'){
            setVariants(data.variants);
        }
        setProduct(data.product);
        setSize(data.product.size);
        setApnaColor(data.product.color);
        setSelectedImage(data.product.CoverImageUrl);
        // setImages[0]=data.product.CoverImageUrl;
        setImages((prevImages:any) => {
          const newImages = [...prevImages]; // Create a copy of the images array
          newImages[0] = data.product.CoverImageUrl; // Update the first image URL
          return newImages;
        });
        

        //my
        extractColors(data.variants || {});


      }
      getproduct();
    }, [productId])

    const isTshirtDataValid = variants && Object.keys(variants).length >0;
    const processedColors: any={};

    const extractColors = (variants:any) => {
      return Object.keys(variants);
    };
    const colors = extractColors(variants);

    const processedSizes = new Set<string>();

    const handleAddToCart =()=>{
      addToCart(product.slug,1,product.Price,product.name,size,apnacolor,product.CoverImageUrl);
    };
    


  return (
    <>
        <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Your existing navigation and content structure */}
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <Image width={576} height={362} className="h-full w-full max-w-full object-cover hover:scale-125" src={selectedImage} alt="Selected" />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  {images.map((image:any, index:any) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleImageClick(image, index)}
                      className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 ${activeIndex === index ? 'border-gray-900' : 'border-transparent'} text-center`}
                    >
                      <Image width={576} height={362} className="h-full w-full object-cover" src={image} alt={`Thumbnail ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Your existing product details structure */}
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product.name} {product.size ? `(${product.size} / ${product.color})` : ''}
            </h1>

            {product?.color && (
                  <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'>
                    <div className='flex'>
                        <span className='mr-3'>Color</span>
                    </div>
                    {isTshirtDataValid && Object.keys(variants).map((color)=>{
                        if(processedColors[color]) return null;
                        processedColors[color] = true;
                        // debugger
                        const sizes = Object.keys(variants[color]);
                        const slug = sizes.includes(size) ? variants[color][size].slug :variants[color][sizes[0]].slug;

                        return (
                            <Link key={color} href={`${process.env.HOST}/product/${slug}`} className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none ${color === apnacolor ? 'border-black' : 'border-gray-300'} ${color === 'black' ? 'bg-slate-500' : `bg-${color}-500`}`}></Link>
                        )

                    })}
                  </div>)}

                  {/* Size */}
                  {product?.size && (
                  <div className='flex items-center my-2 w-1/3 md:w-1/4'>
                    <label className='block m-2 text:sm font-medium'>Size:</label>
                    {/* {isTshirtDataValid  && variants[apnacolor] && Object.keys(variants[apnacolor]).map((hsize)=>{
                      // debugger
                      const slug = variants[apnacolor][hsize]?.slug || Object.values(variants[apnacolor])[0].slug;
                      return slug ? (
                        <Link key={hsize} className={`mx-2 dark:border-white rounded-lg border px-2 ${size === hsize ? 'border-pink-500 bg-pink-100' : 'border-black'}`} href={`${process.env.HOST}/product/${slug}`}>{hsize}</Link>
                      ) : null;
                    })} */}


{isTshirtDataValid && colors &&
  colors.map((item: string) => {
    const sizes = Object.keys(variants[item]);
    return sizes.map((hsize: string) => {
      if (processedSizes.has(hsize)) return null;
      processedSizes.add(hsize);
      const slug = variants[item][hsize]?.slug || Object.values(variants[item])[0]?.slug;
      return slug ? (
        <Link
          key={hsize}
          className={`mx-2 dark:border-white rounded-lg border px-2 ${size === hsize ? 'border-pink-500 bg-pink-100' : 'border-black'}`}
          href={`${process.env.HOST}/product/${slug}`}
        >
          {hsize}
        </Link>
      ) : null;
    });
  })
}



                    

                  </div>)}


                  
            
                  <button className='flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded' onClick={handleAddToCart}>Add2Cart</button>
      </div>
      

    </div>
      </div >
    </section >
    </>
  )
}

export default ProductOne