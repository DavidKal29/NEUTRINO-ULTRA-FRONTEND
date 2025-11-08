import React, { useEffect, useState } from 'react'
import CartItem from '../types/cartItem'

export default function PopupCart() {

  const [cart,setCart] = useState<CartItem[] | []>([])

  const getCartItems = ()=>{
    const setedCart = localStorage.getItem('cart')
    
    const cartProducts:CartItem[] = setedCart ? JSON.parse(setedCart) : []
    

    setCart(cartProducts)


  }

  useEffect(()=>{
    getCartItems()
  },[])


  return (
    <div className='absolute bg-white w-70 h-70 min-[568px]:w-100 min-[568px]:h-80 right-4 z-50 flex flex-col justify-between items-center shadow-lg rounded p-3'>
      
      {/* Div central */}
      <div className='flex flex-col justify-start items-center w-full gap-3 overflow-y-auto'>
        {cart.map((product: CartItem, index: number) => (
          <div key={index} className='flex justify-between items-center w-full gap-3 p-1'>
            
            {/* Imagen */}
            <img className='w-12 h-12 rounded' src={`/images/products/${product?.image}`} alt={product.name} />
            
            {/* Info Producto */}
            <div className='flex flex-col justify-start items-start gap-1 flex-1'>
              <span className='text-black font-bold text-sm truncate'>{product.name}</span>
              <div className='flex justify-start items-center gap-2'>
                <p className='text-gray-500 text-sm'>x{product.quantity}</p>
                <p className='text-red-500 font-semibold text-sm'>{product.totalPrice}€</p>
              </div>
            </div>
          
          </div>
        ))}
      </div>

      {/* Boton Comprar */}
      <button className='bg-red-600 text-white p-2 w-full mt-2 rounded text-sm cursor-pointer'>
        Finalizar Pedido
      </button>

    </div>

  )
}
