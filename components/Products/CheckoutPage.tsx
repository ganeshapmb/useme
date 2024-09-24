'use client'
import React,{useContext, useEffect,useState} from 'react'
import {useStripe,useElements,PaymentElement} from '@stripe/react-stripe-js'
import convertToSubcurrency from '@/lib/convertToSubcurrency'
import { useRouter } from 'next/navigation'
import {CartContext, CartContextType} from '../../context/CartContext'

const CheckoutPage = ({amount}:{amount:number}) => {
    const cartContext = useContext<CartContextType | undefined>(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const {subTotal} = cartContext;
    console.warn(subTotal,"amo")
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>()
    const [clientSecret, setClientSecret] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const updateSecret =async ()=>{
            let res =await fetch("/api/create-payment-intent",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({amount:convertToSubcurrency(amount)})
            })
            let data = await res.json();
            setClientSecret(data.clientSecret);

        }
      updateSecret();

    // fetch("/api/create-payment-intent", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => setClientSecret(data.clientSecret));

    }, [amount])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (!stripe || !elements) {
          return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
          setErrorMessage(submitError.message);
          setLoading(false);
          return;
        }
    
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
          },
          redirect: "if_required",
        });
        //redirect:"if_required" for spa not redirecting
        if (error) {
          setErrorMessage(error.message);
        } else {
          router.push(`/payment-success?amount=${amount}`);
        }
        setLoading(false);
      };

      
    if(!clientSecret || !stripe || !elements){
        return <div>Loading..</div>
    }
    

  return (
    <>
        <div className='relative mx-auto w-full bg-white'>
            <div className='grid min-h-screen grid-cols-10'>
                <div className='col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24'>
                    <div className='mx-auto w-full max-w-lg'>
                        <h1 className='relative text-2xl font-medium text-gray-700 sm:text-3xl'>
                            Secure Checkout
                            <span className='mt-2 block h-1 w-10 bg-teal-600 sm:w-20'></span>
                        </h1>
                        <form onSubmit={handleSubmit} className='mt-10 flex flex-col space-y-4'>
                            {clientSecret && <PaymentElement/>}
                            {errorMessage && <div>{errorMessage}</div>}
                            <button type='submit' className='mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg' disabled={!stripe || loading}>{!loading ? `Pay $${amount}`: "TeharJa TeharJa Sasur"}</button>
                        </form>
                    </div>
                </div>

                <div className='relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24'>
                    <h2 className='sr-only'>Order Summary</h2>
                    <div>
                    <img
                src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
                    <div className='absolute inset-0 h-full w-full bg-gradient-to-t from teal-800 to-teal-400 opacity-95'></div>
                    </div>
                    <div className='relative'>
                        <ul className='space-y-5'>
                            {/* Repeat */}
                            <li className='flex justify-between'>
                                <div className='inline-flex'>
                                <img
                      src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhhaXIlMjBkcnllcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt=""
                      className="max-h-16"
                    />
                    <div className='ml-3'>
                        <p className='texy-base font-semibold text-white'>Nano Hair Dryer</p>
                        <p className="text-sm font-medium text-white text-opacity-80">
                        Pdf, doc Kindle
                      </p>
                    </div>
                                </div>

                                <p className="text-sm font-semibold text-white">$260.00</p>
                            </li>
                            {/* Repeat */}

                        </ul>

                        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>$510.00</span>
                </p>
                <p className="flex justify-between text-sm font-medium text-white">
                  <span>Vat: 10%</span>
                  <span>$55.00</span>
                </p>
              </div>
                    </div>


                </div>
            </div>
        </div>
    </>
  )
}

export default CheckoutPage