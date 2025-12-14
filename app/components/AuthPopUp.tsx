import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { useState } from 'react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {User} from '../types/user'

interface AuthProps{
    showPopup:boolean,
    setShowPopup:(showPopup:boolean) =>void,
    popupView:string,
    setPopupView:(popupView:string)=>void,
    router:AppRouterInstance,
    user:User | null,
    setUser:(user:User | null)=>void,
    getProfile:()=>void
}

export default function AuthPopUp({showPopup,setShowPopup,popupView,setPopupView,router,user,setUser,getProfile}:AuthProps) {
  
  const [visiblePassword,setVisiblePassword] = useState(false)
  const [form, setForm] = useState({ email: '', username:'', password: '', name:'', lastname:'' });
  const [csrfToken,setCsrfToken] = useState<string | ''>('')
  
  const getCsrfToken = ()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf-token`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${popupView}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json','CSRF-Token':csrfToken },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        if (data.success) {
          setShowPopup(false)
          setForm({email:'',username:'',password:'',name:'',lastname:''})
          toast.success(data.success)
          getProfile()

        } else {
          if (data.message && Array.isArray(data.message)) {
            toast.error(data.message[0])
          }else{
            toast.error(data.error)
          }
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };

  useEffect(()=>{
    getCsrfToken()
  },[])

  return (
    <div
            className='fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50'
            onClick={() => setShowPopup(false)}
          >
            <div
              className='bg-white border-2 rounded-2xl p-6 max-[360px]:w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] relative shadow-xl text-center'
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPopup(false)}
                className='cursor-pointer absolute top-2 right-3 text-red-600 text-2xl font-bold'
              >
                ×
              </button>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center">
                <h1 className='text-black font-bold text-center text-[30px]'>
                  {popupView === 'login' ? 'Iniciar Sesión' : popupView === 'register' ? 'Crear Cuenta' : 'Olvidé la Contraseña'}
                </h1>
                
                <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3 border-2 border-gray-500">
                  <i className="fa-solid fa-envelope text-gray-500 text-lg mr-2"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
                  />
                </div>

                {popupView === 'register' && (<>
                  <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3 border-2 border-gray-500">
                    <i className="fa-solid fa-user text-gray-500 text-lg mr-2"></i>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
                    />
                  </div>

                  <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3 border-2 border-gray-500">
                    <i className="fa-solid fa-user text-gray-500 text-lg mr-2"></i>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      onChange={handleChange}
                      className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
                    />
                  </div>

                  <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3 border-2 border-gray-500">
                    <i className="fa-solid fa-user text-gray-500 text-lg mr-2"></i>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Apellido"
                      onChange={handleChange}
                      className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
                    />
                  </div>
                </>)}

                {(popupView === 'login' || popupView === 'register') && (<>
                  <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3 border-2 border-gray-500">
                    <i className="fa-solid fa-lock text-gray-500 text-lg mr-2"></i>
                    <input
                      type={visiblePassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="off"
                      placeholder="Password"
                      onChange={handleChange}
                      className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setVisiblePassword(!visiblePassword)}
                      className="text-gray-500 cursor-pointer"
                    >
                      <i className={visiblePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                    </button>
                  </div>
                </>)}

                {popupView === 'login' && (<>
                  <p className="text-center text-sm text-gray-500">
                  ¿Olvidaste la contraseña?{' '}
                    <button type='button' onClick={()=>{setPopupView('forgotPassword')}} className="text-red-600 hover:underline cursor-pointer">
                      Recuperar
                    </button>
                  </p>
                </>)}

                {popupView === 'forgotPassword' && (<>
                  <p className="text-center text-sm text-gray-500">
                  ¿Recordaste la contraseña?{' '}
                    <button type='button' onClick={()=>{setPopupView('login')}} className="text-red-600 hover:underline cursor-pointer">
                      Iniciar Sesión
                    </button>
                  </p>
                </>)}
                

                <button
                  type='submit'
                  className="cursor-pointer w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] bg-red-600 rounded-xl text-white font-bold text-lg transition-transform transform hover:scale-105 hover:bg-red-700 active:scale-95"
                >
                  {popupView === 'login' ? 'Login' : popupView === 'register' ? 'Register' : 'Send Email'}
                </button>

                {popupView === 'login' && (<>
                  <p className="text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{' '}
                    <button type='button' onClick={()=>{setPopupView('register')}} className="cursor-pointer text-red-600 hover:underline">
                      Crear cuenta
                    </button>
                  </p>
                </>)}

                {popupView === 'register' && (<>
                  <p className="text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{' '}
                    <button type='button' onClick={()=>{setPopupView('login')}} className="cursor-pointer text-red-600 hover:underline">
                      Iniciar Sesión
                    </button>
                  </p>
                </>)}
              
              </form>
  
            </div>
          </div>
  )
}
