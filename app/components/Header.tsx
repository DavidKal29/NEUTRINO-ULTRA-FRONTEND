import React, { useState } from 'react'
import AuthPopUp from './AuthPopUp'
import { User } from "../types/user";
import { toast } from 'sonner';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import CartLink from './CartLink';


interface HeaderProps {
  user:User | null,
  setUser:(user:User | null)=>void,
  router:AppRouterInstance,
  getProfile:()=>void
}

export default function Header({user,setUser,router,getProfile}:HeaderProps) {
  const [showPopup,setShowPopup] = useState(false)

  const [popupView,setPopupView] = useState('login')

  const logout = () => {
    toast("¿Seguro que quieres cerrar sesión?", {
      action: {
        label: "Cerrar sesión",
        onClick: () => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);

              if (data.success) {
                setUser(null);
                localStorage.clear();
                router.push('/');
              } else {
                toast.error(data.error);
                console.log(data.error);
              }
            })
            .catch(error => {
              console.log('Error al enviar los datos a Logout');
              console.error(error);
              toast.error('Error al enviar los datos');
            });
        },
      },
      cancel: {
        label: "Cancelar",
      },
    });
  };

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
          
          

          {/* Mi Cuenta */}
          {user ? 
          
          (<>
            <a href='/profile' className="flex items-center gap-1 cursor-pointer">
              <i className="fa-solid fa-user text-red-600 text-[0.9rem]"></i>
              <span>{user?.username}</span>
            </a>

            <button onClick={()=>{logout()}} className="flex items-center gap-1 cursor-pointer">
              <i className="fa-solid fa-power-off text-red-600 text-[0.9rem]"></i>
              <span>Salir</span>
            </button>

            
          </>) 
          
            : 
          
          (<>
            <button onClick={()=>{setShowPopup(true)}} className="flex items-center gap-1 cursor-pointer">
              <i className="fa-solid fa-user text-red-600 text-[0.9rem]"></i>
              <span>Mi Cuenta</span>
            </button>
          </>)}
        
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

        {(!user || user?.rol === 'client') && (<>
          {/* Carrito */}
          <CartLink user={user}></CartLink>
        </>)}

        {user?.rol.includes('admin') && (<>
          <a href='/admin' className="relative max-[360px]:block min-[560px]:block text-white text-[18px] lg:text-[26px] cursor-pointer">
            <i className="fa-solid fa-gear"></i> 
          </a>
        </>)}

        


        {/* PopUp */}
        {showPopup && (
          <AuthPopUp user={user} setUser={setUser} getProfile={getProfile} router={router} popupView={popupView} setPopupView={setPopupView} showPopup={showPopup} setShowPopup={setShowPopup}></AuthPopUp>
        )}
      </div>
    </header>
  )
}
