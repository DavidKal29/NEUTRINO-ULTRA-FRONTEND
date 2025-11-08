import React, { useState } from 'react'
import AuthPopUp from './AuthPopUp'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface HeaderProps {
  user:User | null,
  setUser:(user:User | null)=>void,
  router:AppRouterInstance,
  getProfile:()=>void
}

export default function Footer({user,setUser,router,getProfile}:HeaderProps) {

    const [showPopup,setShowPopup] = useState(false)
    const [popupView,setPopupView] = useState('login')



    return (
        <footer className="bg-black w-full text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* PopUp */}
                {showPopup && (
                <AuthPopUp user={user} setUser={setUser} getProfile={getProfile} router={router} popupView={popupView} setPopupView={setPopupView} showPopup={showPopup} setShowPopup={setShowPopup}></AuthPopUp>
                )}
                
                {/* SOBRE NOSOSTROS */}
                <div>
                <h3 className="text-white font-semibold text-lg mb-4">SOBRE NOSOTROS</h3>
                <p className="text-sm leading-relaxed mb-4">
                    Tienda especializada en tecnología, donde se venden desde dispositivos pequeños que caben en el bolsillo, hasta pantallas medianas que parecen portarretratos del futuro, y ordenadores tan potentes que casi hacen el café. 
                </p>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                    <span className="text-red-500">📍</span>
                        C/ Ortega, 31, Valencia
                    </li>
                    <li className="flex items-center gap-2">
                    <span className="text-red-500">📞</span>
                        969 696 969
                    </li>
                    <li className="flex items-center gap-2">
                    <span className="text-red-500">✉️</span>
                        centrokal29@gmail.com
                    </li>
                </ul>
                </div>

                
                {/* INFORMACIÓN */}
                <div>
                <h3 className="text-white font-semibold text-lg mb-4">INFORMACIÓN</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
                </ul>
                </div>

                {/* CATEGORÍAS */}
                <div>
                <h3 className="text-white font-semibold text-lg mb-4">CATEGORÍAS</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Móviles</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Tablets</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Portátiles</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Ordenadores</a></li>
                </ul>
                </div>

                {/* SERVICIO */}
                <div>
                <h3 className="text-white font-semibold text-lg mb-4">MIS DATOS</h3>
                <ul className="space-y-2 text-sm">
                    {user ? (<><li><button className="cursor-pointer hover:text-white transition-colors">{user?.username}</button></li></>) : (<><li><button onClick={()=>{setShowPopup(true)}} className="cursor-pointer hover:text-white transition-colors">Mi cuenta</button></li></>)}
                    <li><a href="#" className="hover:text-white transition-colors">Carrito</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Sporte técnico</a></li>
                </ul>
                </div>
            </div>

            {/* Línea inferior */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Neutrino Ultra. Todos los derechos reservados.
            </div>
        </footer>
    )
}
