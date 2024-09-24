'use client'
import Link from 'next/link'
import { usePathname,useSearchParams } from 'next/navigation'
import React, { useContext,useEffect,useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import Shop2Icon from '@mui/icons-material/Shop2';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';

// import { CartContext } from '@/context/CartContext';
import {CartContext, CartContextType} from '../../context/CartContext'
// import { useUser } from '@auth0/nextjs-auth0/client';
import {SignedIn,SignedOut, SignOutButton} from '@clerk/nextjs'
import { useRouter } from 'next/navigation';



const Navbar = () => {
  const pathName = usePathname()
  const searchParams = useSearchParams();
  const pname = pathName.split('/')[1] || 'home';
  console.warn(pname,"pname")
  const [value, setValue] = useState(pname);
  const router = useRouter();

  useEffect(() => {
    setValue(pname);
  }, [pname])
  
  

  // const { addToCart } = useContext(CartContext);
  // const {clearCart} = useContext(CartContext);
  // const {removeFromCart} = useContext(CartContext);
  // const {cart} = useContext(CartContext);
  // const {subTotal} = useContext(CartContext);

  const cartContext = useContext<CartContextType | undefined>(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  // Destructure the context to get addToCart
  const { addToCart } = cartContext;
  const {clearCart} = cartContext;
  const {removeFromCart} = cartContext;
  const {cart} = cartContext;
  const {subTotal} = cartContext;

  //for cart
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = ()=>{
    setIsModalOpen(!isModalOpen);
  };

  // const { user, error, isLoading } = useUser();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    let data = newValue === 'home'? '':newValue;
    router.push(`/${data}`)
    // setValue(newValue);
  };

  return (
    <>
      <div className=''>
        <header className='bg-pink-500 p-4 z-50'>
          <div className='container mx-auto'>
            <div className='flex items-center justify-between'>
              <div className='text-white font-semibold text-2xl'>Usememb</div>
              <nav className='hidden md:block space-x-4'>
                <Link className={`link ${pathName === '/' ? 'text-white font-bold w-full text-center text-[15px] bg-blue-400 py-3 px-4 rounded-full cursor-pointer': 'text-white'} hover:text-pink-300`} href={"/"}>Home</Link>
                <Link className={`link ${pathName === '/about' ? 'text-white font-bold w-full text-center text-[15px] bg-blue-400 py-3 px-4 rounded-full cursor-pointer': 'text-white'} hover:text-pink-300`} href={"/about"}>About</Link>
                <Link className={`link ${pathName === '/shop' ? 'text-white font-bold w-full text-center text-[15px] bg-blue-400 py-3 px-4 rounded-full cursor-pointer': 'text-white'} hover:text-pink-300`} href={"/shop"}>Shop</Link>
                <Link className={`link ${pathName === '/contact' ? 'text-white font-bold w-full text-center text-[15px] bg-blue-400 py-3 px-4 rounded-full cursor-pointer': 'text-white'} hover:text-pink-300`} href={"/contact"}>Contact</Link>
                <ShoppingCartIcon className='text-white cursor-pointer' onClick={toggleModal} />
                {/* {!user && (
                  <Link href="/api/auth/login" className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Login</Link>
                )}
                
                {user && (
                  <Link href="/api/auth/logout" className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Logout</Link>
                )} */}

                <SignedOut>
                  <Link className="mr-5 shrink-0 rounded-full bg-red-600 px-8 py-3 font-medium text-white focus:bg-red-700 focus:outline-none hover:bg-red-700" href='/sign-up'>SignUp</Link>
                  <Link className="mr-5 shrink-0 rounded-full bg-blue-400 px-8 py-3 font-medium text-white focus:ring-indigo-200 focus:outline-none hover:bg-blue-700" href='/sign-in'>Signin</Link>
                </SignedOut>
                <SignedIn>
                    <SignOutButton className='mr-5 shrink-0 rounded-full bg-red-600 px-8 py-3 font-medium text-white focus:bg-red-700 focus:outline-none hover:bg-red-700' />
                  
                </SignedIn>
                
              </nav>
            </div>
          </div>
        </header>

        {/* Small screen */}
        <Box className='w-full drop-shadow-md md:hidden fixed bottom-0 left-0 right-0'>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      >
        {/* <Link href={"/"}> */}
        <BottomNavigationAction label="home" value="home" icon={<HomeIcon />} />
        {/* </Link> */}
        <BottomNavigationAction label="shop" value="shop" icon={<Shop2Icon />} />
        <Link href={"/about"} className={`link ${pathName === '/about' ? ' bg-blue-400': ''} hover:text-pink-300`}>
        <BottomNavigationAction label="Nearby" icon={<InfoIcon />} /></Link>
      </BottomNavigation>
    </Box>


    {/* Cart */}
    {isModalOpen && (<div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal="true">
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 cursor-pointer" onClick={clearCart}>
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full'>
                  <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>Cart</h3>
                  <div className='mt-2 space-y-6'>
                    <ul className='my-8'>
                      {/* cart loop */}
                        {Object.keys(cart).length ==0 && <div className='mt-7'>Lemon Chus Le</div>}
                        {Object.keys(cart).map((k)=>{
                          return <li className='flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0' key={k}>
                            <div className='shrink-0'>
                              <Image className='h-24 w-24 max-w-full rounded-lg object-cover' src={cart[k].coverimageurl} alt={cart[k].name} width={96} height={96} />
                            </div>
                            <div className='relative flex flex-1 flex-col justify-between'>
                              <div className='sm:col-gap-5 sm:grid sm:grid-cols-2'>
                                <div className='pr-8 sm:pr-5'>
                                  <p className='text-base font-semibold text-gray-900'>{cart[k].name}</p>
                                  <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{cart[k].size} - {cart[k].variant}</p>

                                  <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${cart[k].price * cart[k].qty}</p>

                                      <div className="sm:order-1">
                                        <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                          <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white" onClick={()=>{removeFromCart(k,1)}}>-</button>
                                            <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{cart[k].qty}</div>
                                            <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white" onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant,cart[k].coverimageurl)}}>+</button>
                                        </div>
                                      </div>
                                    </div>
                                </div>

                                <div className='absolute top-0 right-0 flex sm:bottom-0 sm:top-auto'>
                                <button type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" ></path>
                                  </svg>
                                </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        })}
                      {/* cart loop */}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <div className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Total - {subTotal}</div>
            <Link href='/payments' onClick={toggleModal} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Checkout</Link>
            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={toggleModal}>Continue Shopping</button>
          </div>


          </div>
        </div>
      </div>
    </div>)}
    {/* Cart */}

      </div>
    </>
  )
}

export default Navbar