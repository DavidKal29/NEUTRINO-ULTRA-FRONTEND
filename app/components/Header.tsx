import React, { useState } from 'react'
import AuthPopUp from './AuthPopUp'

export default function Header() {
  const [showPopup,setShowPopup] = useState(false)

  const [popupView,setPopupView] = useState('login')


  return (
    <header className="w-full bg-[#0a0a0a] text-white text-[0.875rem] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]">
      {/* Arriba */}
      <div className="flex justify-between items-center px-4 py-1.5 border-b border-gray-800 text-white">
        
        {/* Datos */}
        <div className="flex justify-center items-center gap-12 py-4">

          {/* Teléfono */}
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-phone text-red-600 text-[0.9rem]"></i>
            <span>969 696 969</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-1 hidden md:flex">
            <i className="fa-solid fa-envelope text-red-600 text-[0.9rem]"></i>
            <a href="mailto:centrokal29@gmail.com">centrokal29@gmail.com</a>
          </div>

          {/* Calle */}
          <div className="flex items-center gap-1 hidden lg:flex">
            <i className="fa-solid fa-location-dot text-red-600 text-[0.9rem]"></i>
            <span>C/ Ortega, 31, Valencia</span>
          </div>
          
        </div>

        {/* Mi cuenta */}
        <div className="flex items-center gap-4">
          
          {/* Divisa */}
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-euro-sign text-red-600 text-[0.9rem]"></i>
            <span>EUR</span>
          </div>

          {/* Mi Cuenta */}
          <button onClick={()=>{setShowPopup(true)}} className="flex items-center gap-1 cursor-pointer">
            <i className="fa-solid fa-user text-red-600 text-[0.9rem]"></i>
            <span>Mi Cuenta</span>
          </button>
          
          {/* Carrito */}
          <a href="/cart" className="max-[360px]:hidden block min-[560px]:hidden text-white text-[18px] duration-[0.5s] hover:text-[#C40C0C]">
            <i className="fa-solid fa-cart-shopping"></i>
          </a>
        
        </div>
      </div>

      {/* Abajo */}
      <div className="flex justify-between items-center px-4 xl:px-10 py-2.5 xl:py-0.5 bg-[#0f0f0f] gap-3 border-b-4 border-red-500">
        
        {/* Logo */}
        <a href="/" className="max-[360px]:w-[20%] w-[22%] min-[568px]:w-[10%] sm:w-[10%] lg:w-[9%]">
          <img src="/logo.png" alt="Logo" />
        </a>

        {/* Buscador */}
        <form method="post">
          
          <div className="relative w-full">
            <input type="text" className="font-bold outline-none p-1.5 max-[360px]:w-[11rem] w-[15rem] min-[560px]:w-[24rem] md:w-[460px] lg:w-[38rem] xl:w-[45rem] h-[34px] xl:h-[50px] text-gray-900 bg-gray-50 rounded-[5px] rounded-r-lg border border-gray-300 text-[11px] max-[320px]:text-[9px] sm:text-[14px]" placeholder="Ordenadores, Tablets, Móviles..." required/>

            {/* Buscar */}
            <button type="submit" className="h-[34px] xl:h-[50px] absolute right-0 px-1.5 sm:px-3 bg-[#C40C0C] text-white rounded-r-lg border border-red-700">
              <i className="fa-solid fa-magnifying-glass text-[1rem] md:text-[1.1rem]"></i>
            </button>
          </div>
        </form>

        {/* Carrito */}
        <a href="/cart" className="max-[360px]:block hidden min-[560px]:block text-white text-[18px] lg:text-[26px] duration-[0.5s] hover:text-[#C40C0C]">
          <i className="fa-solid fa-cart-shopping"></i>
        </a>


        {/* PopUp */}
        {showPopup && (
          <AuthPopUp popupView={popupView} setPopupView={setPopupView} showPopup={showPopup} setShowPopup={setShowPopup}></AuthPopUp>
        )}
      </div>
    </header>
  )
}
