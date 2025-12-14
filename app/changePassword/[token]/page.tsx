"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { User } from '../../types/user';
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

export default function ChangePassword() {

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [visiblePassword,setVisiblePassword] = useState<boolean | false>(false)
  const [visiblePassword2,setVisiblePassword2] = useState<boolean | false>(false)

 
  const [form,setForm] = useState({
    new_password:'',
    confirm_password:''
  })

  const {token} = useParams()

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/changePassword/${token}`, {
      method: 'POST',
      credentials: 'include',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      
      if (data.success) {
        toast.success(data.success)
        router.push('/')
      }else{
        if (data.message && Array.isArray(data.message)) {
          toast.error(data.message[0])
        }else{
          toast.error(data.error)
        }
      }
    }).catch(error=>{toast.error('Error al enviar los datos');console.log(error)})
  }


  const getProfile = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data.user);
          setUser(data.user);
          router.push('/')
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };


  useEffect(() => {
    document.title = 'Change Password';
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-white relative overflow-hidden ">
      <Header router={router} user={user} setUser={setUser} getProfile={getProfile} />

      <div className="bg-gray-200 p-4 md:p-8 lg:p-12 flex flex-col justify-center items-start gap-2 drop-shadow-lg w-full">
        <h2 className="text-[25px] sm:text-3xl md:text-5xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent">
          CAMBIAR CONTRASEÑA
        </h2>

        <p className="text-black">Recuerda utilizar una contraseña segura, que no sea igual a la anterior y que contenga un número, una minúscula, una mayúscula y un carácter especial :)</p>

        
      </div>

      <div className="flex flex-col justify-center items-start w-full p-6 md:p-12">
        <h2 className="text-[20px] md:text-3xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent mb-6">
            FORMULARIO DE CAMBIO DE CONTRASEÑA
        </h2>
        
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
                className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full md:col-span-2 lg:col-span-1 flex justify-between focus-within:ring-1 focus-within:ring-black focus-within:border-black"
            >
                <input
                    type={visiblePassword ? 'text' : 'password'}
                    name="new_password"
                    autoComplete="off"
                    placeholder="New Password"
                    onChange={handleChange}
                    className="outline-none w-full text-black placeholder:text-gray-500"
                />

                <button
                    type="button"
                    onClick={() => setVisiblePassword(!visiblePassword)}
                    className="text-gray-500 cursor-pointer ml-2"
                >
                    <i className={visiblePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                </button>
            </div>

            <div
                className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full md:col-span-2 lg:col-span-1 flex justify-between focus-within:ring-1 focus-within:ring-black focus-within:border-black"
            >
                <input
                    type={visiblePassword2 ? 'text' : 'password'}
                    name="confirm_password"
                    autoComplete="off"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    className="outline-none w-full text-black placeholder:text-gray-500"
                />

                <button
                    type="button"
                    onClick={() => setVisiblePassword2(!visiblePassword2)}
                    className="text-gray-500 cursor-pointer ml-2"
                >
                    <i className={visiblePassword2 ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                </button>
            </div>

            <button
              type="submit"
              className="mt-2 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded drop-shadow-lg transition-colors w-full md:col-span-2 lg:col-span-1 cursor-pointer"
            >
              Guardar Cambios
            </button>
        </form>
      </div>

      


      <Footer router={router} user={user} setUser={setUser} getProfile={getProfile} />
    </div>
  );
}
