'use client'
import { createContext, useState, useEffect,ReactNode } from "react"

// Define the types for the cart item and the context
interface CartItem {
    qty: number;
    price: number;
    name: string;
    size: string;
    variant: string;
    coverimageurl:string;

  }
  
export  interface CartContextType {
    cart: Record<string, CartItem>;
    subTotal: number;
    addToCart: (itemCode: string, qty: number, price: number, name: string, size: string, variant: string,coverimageurl:string) => void;
    clearCart: () => void;
    removeFromCart: (itemCode: string, qty: number) => void;
  }

export const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props for the CartProvider component
interface CartProviderProps {
    children: ReactNode;
  }
  

export const CartProvider: React.FC<CartProviderProps> = ({children})=>{
    const [cart, setCart] = useState({})
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
      try {
        // if(localStorage.getItem("cart")){
            
        //     setCart(JSON.parse(localStorage.getItem("cart")));
        //     saveCart(JSON.parse(localStorage.getItem("cart")));
        // }
        const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
        saveCart(parsedCart);
      }
      } catch (error) {
        console.error(error)
        localStorage.clear();
      }
    }, [])

    const saveCart =(myCart: Record<string, CartItem>)=>{
        localStorage.setItem("cart",JSON.stringify(myCart))
        let subt=0
        let keys = Object.keys(myCart);
        for(let i=0; i<keys.length; i++){
            subt+= myCart[keys[i]].price * myCart[keys[i]].qty;
        }
        setSubTotal(subt);
    }

    const addToCart = (itemCode: string, qty: number, price: number, name: string, size: string, variant: string,coverimageurl:string)=>{
        debugger
        let newCart: Record<string, CartItem> = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty, price, name, size, variant,coverimageurl };
    }
    setCart(newCart);
    saveCart(newCart);
    }

    const clearCart = () =>{
        setCart({});
        saveCart({});
        console.warn("kart kalli ho gaya");
    }

    

    const removeFromCart = (itemCode: string, qty: number) => {
        //for deep copy
        let newCart: Record<string, CartItem> = JSON.parse(JSON.stringify(cart));
        if (itemCode in newCart) {
          newCart[itemCode].qty = newCart[itemCode].qty - qty;
        }
        if (newCart[itemCode]?.qty <= 0) {
          delete newCart[itemCode];
        }
        setCart(newCart);
        saveCart(newCart);
      };

    return(
        <CartContext.Provider value={{ cart, subTotal, addToCart, clearCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
