'use client'
import React, { useEffect, useState } from 'react'
import {CartItem} from '../types/cartItem'

export default function CartLink() {
  const [cartCounter, setCartCounter] = useState(0)

  const getCartitems = () => {
    const setedCart = localStorage.getItem('cart')

    const cart:CartItem[] = setedCart ? JSON.parse(setedCart) : []

    let counter:number = 0

    cart.forEach((product:CartItem) => {
        counter += product.quantity
    })

    setCartCounter(counter)

  }

  useEffect(() => {
    getCartitems()

    // Escuchar el evento personalizado “storage” cuando cambie el carrito
    window.addEventListener('storage', getCartitems)

    // Limpieza
    return () => window.removeEventListener('storage', getCartitems)
  }, [])

  return (
    <a href="/cart" className="relative max-[360px]:hidden block min-[560px]:hidden text-white text-[18px] duration-[0.5s] hover:text-[#C40C0C]">
        <i className="fa-solid fa-cart-shopping"></i>
            
        {/* Contador */}
        {cartCounter > 0 && (
        <div className="absolute -top-3 -right-2 bg-red-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cartCounter}
        </div>
        )}
    
    </a>
  )
}
