"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { User } from '../types/user';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Profile() {

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [visiblePassword,setVisiblePassword] = useState(false)

  const [form,setForm] = useState({
    email:'',
    username:'',
    name:'',
    lastname:'',
    dni:'',
    phone:'',
    address:'',
    rol:'',
    password:''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/createUser`, {
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
        router.push('/admin')
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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/profile`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        if (data.success) {
          console.log(data.user);
          setUser(data.user);

          if (data.user.rol != 'superadmin') {
            toast.error('No eres super administrador')
            router.push('/')
          }
        }else{
          router.push('/')     
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };



  useEffect(() => {
    document.title = 'Create User';
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-white relative overflow-hidden ">
      <Header router={router} user={user} setUser={setUser} getProfile={getProfile} />

      <div className="flex flex-col justify-center items-start w-full p-6 md:p-12">
        <h2 className="text-[20px] md:text-3xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent mb-6">
          CREAR USUARIO NUEVO
        </h2>
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <input
            type="text"
            className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
            placeholder="Nombre"
            name="name"
            onChange={handleChange}
          />
          
          <input
            type="text"
            className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
            placeholder="Apellidos"
            name="lastname"
            onChange={handleChange}
          />
          
          <input
            type="email"
            className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
            placeholder="Correo electrónico"
            name="email"
            onChange={handleChange}
          />
            
          <input
            type="text"
            className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          
          <input
            type="text"
            className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
            placeholder="Domicilio"
            name="address"
            onChange={handleChange}
          />
            
          <input
            type="text"
            className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
            placeholder="Teléfono"
            name="phone"
            onChange={handleChange}
          />
          
          <input
            type="text"
            className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full md:col-span-2 lg:col-span-1"
            placeholder="DNI"
            name="dni"
            onChange={handleChange}
          />

          <div
            className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full md:col-span-2 lg:col-span-1 flex justify-between focus-within:ring-1 focus-within:ring-black focus-within:border-black"
          >
            <input
              type={visiblePassword ? 'text' : 'password'}
              name="password"
              autoComplete="off"
              placeholder="Password"
              onChange={handleChange}
              className="outline-none w-full"
            />

            <button
              type="button"
              onClick={() => setVisiblePassword(!visiblePassword)}
              className="text-gray-500 cursor-pointer ml-2"
            >
              <i className={visiblePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
            </button>
          </div>


          <select 
            name="rol" 
            onChange={handleChange}
            className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full md:col-span-2 lg:col-span-1"> 
              <option value="client" selected>Cliente</option>
              <option value="admin">Administrador</option>
              <option value="superadmin">SuperAdministrador</option>
          </select>

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
