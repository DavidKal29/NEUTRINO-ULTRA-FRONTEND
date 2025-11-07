import React, { useState } from 'react'
import { toast } from 'sonner'

export default function Header() {
  const [showPopup,setShowPopup] = useState(false)

  const [popupView,setPopupView] = useState('login')

  const [visiblePassword,setVisiblePassword] = useState(false)
  const [form, setForm] = useState({ email: '', username:'', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${popupView}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        if (data.success) {
          setShowPopup(false)
          setForm({email:'',username:'',password:''})
          toast.success(data.success)

        } else {
          if (data.message && Array.isArray(data.message)) {
            toast.error(data.message[0])
          }else{
            toast.error(data.error)
          }
        }
      })
      .catch(() => alert('Error al enviar los datos'));
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
                    <button onClick={()=>{setPopupView('forgotPassword')}} className="text-red-600 hover:underline cursor-pointer">
                      Recuperar
                    </button>
                  </p>
                </>)}

                {popupView === 'forgotPassword' && (<>
                  <p className="text-center text-sm text-gray-500">
                  ¿Recordaste la contraseña?{' '}
                    <button onClick={()=>{setPopupView('login')}} className="text-red-600 hover:underline cursor-pointer">
                      Iniciar Sesión
                    </button>
                  </p>
                </>)}
                

                <button
                  className="cursor-pointer w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] bg-red-600 rounded-xl text-white font-bold text-lg transition-transform transform hover:scale-105 hover:bg-red-700 active:scale-95"
                >
                  {popupView === 'login' ? 'Login' : popupView === 'register' ? 'Register' : 'Send Email'}
                </button>

                {popupView === 'login' && (<>
                  <p className="text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{' '}
                    <button onClick={()=>{setPopupView('register')}} className="cursor-pointer text-red-600 hover:underline">
                      Crear cuenta
                    </button>
                  </p>
                </>)}

                {popupView === 'register' && (<>
                  <p className="text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{' '}
                    <button onClick={()=>{setPopupView('login')}} className="cursor-pointer text-red-600 hover:underline">
                      Iniciar Sesión
                    </button>
                  </p>
                </>)}
              
              </form>
  
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
