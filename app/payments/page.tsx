'use client'
import React, { useContext } from 'react'
import convertToSubcurrency from '@/lib/convertToSubcurrency'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {CartContext, CartContextType} from '../../context/CartContext'
import CheckoutPage from '@/components/Products/CheckoutPage'

const Payment = () => {
    const cartContext = useContext<CartContextType | undefined>(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const {subTotal} = cartContext;
  if (subTotal <= 0) {
    // Optionally, render a loading or error message
    return <p>Calculating total... Please wait.</p>;
  }
//   console.log(subTotal,"subTota")
//   const amount = 500;
  if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return (
    <>
        <Elements stripe={stripePromise} options={{mode:"payment", amount:convertToSubcurrency(subTotal),//cents
        currency:"usd"
        }}>
            <CheckoutPage amount={subTotal}/>
        </Elements>
    </>
  )
}

export default Payment