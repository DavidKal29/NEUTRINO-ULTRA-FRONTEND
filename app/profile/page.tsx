"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { User } from '../types/user';
import {OrderItem} from '../types/orderItem'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import OrdersTable from "../components/OrdersTable";

export default function Profile() {

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [view, setView] = useState<string | 'misDatos'>('misDatos');
  const [csrfToken,setCsrfToken] = useState<string | ''>('')
    
  const getCsrfToken = ()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf-token`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }

  const [form,setForm] = useState({
    email:'',
    username:'',
    name:'',
    lastname:'',
    dni:'',
    phone:'',
    address:''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/editProfile`, {
      method: 'POST',
      credentials: 'include',
      headers:{'Content-Type':'application/json','CSRF-Token':csrfToken},
      body:JSON.stringify(form)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      
      if (data.success) {
        toast.success(data.success)
      }else{
        if (data.message && Array.isArray(data.message)) {
          toast.error(data.message[0])
        }else{
          toast.error(data.error)
        }
      }
    }).catch(error=>{toast.error('Error al enviar los datos');console.log(error)})
  }

  const [orders,setOrders] = useState<OrderItem[] | []>([])

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
          form.email = data.user.email || ''
          form.username = data.user.username || '',
          form.name = data.user.name || '',
          form.lastname = data.user.lastname || '',
          form.dni = data.user.dni || '',
          form.phone = data.user.phone || '',
          form.address = data.user.address || ''
        }else{
          toast.error(data.error)
          router.push('/')
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };

  const getMyOrders = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/getMyOrders`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        if (data.success) {
          setOrders(data.orders)
        }else{
          toast.error(data.error)
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };

  const deleteOrder = (id_order:string) => {
    toast("¿Seguro que quieres eliminar este pedido?", {
      action: {
        label: "Eliminar",
        onClick: () => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/deleteOrder/${id_order}`, {
            method: 'GET',
            credentials: 'include'
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.success) {
              toast.success(data.success)
              getMyOrders()
            }else{
              toast.error(data.error)
            }
          })
          .catch(() => toast.error('Error al enviar los datos'));
        },
      },
      cancel: {
        label: "Cancelar",
      },
    } as any);
  };

  useEffect(() => {
    document.title = 'Profile';
  }, []);

  useEffect(() => {
    getProfile();
    getMyOrders()
    getCsrfToken()
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-white relative overflow-hidden ">
      <Header router={router} user={user} setUser={setUser} getProfile={getProfile} />

      <div className="bg-gray-200 p-4 md:p-8 lg:p-12 flex flex-col justify-center items-start gap-2 drop-shadow-lg w-full">
        <h2 className="text-[25px] sm:text-3xl md:text-5xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent">
          MI PERFIL
        </h2>

        <div className="flex justify-center items-center gap-2 text-[15px]">
          <button onClick={() => setView('misDatos')} className={`cursor-pointer ${view === 'misDatos' ? 'text-gray-600 font-bold' : 'text-gray-400'}`}>MIS DATOS</button>
          
          {user?.rol === 'client' && (<>
            <p className="text-gray-600">/</p>
            <button onClick={() => setView('misPedidos')} className={`cursor-pointer ${view === 'misPedidos' ? 'text-gray-600 font-bold' : 'text-gray-400'}`}>MIS PEDIDOS</button>
          </>)}
        </div>
      </div>

      {view === 'misDatos' && (
        <div className="flex flex-col justify-center items-start w-full p-6 md:p-12">
          <h2 className="text-[20px] md:text-3xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent mb-6">
            EDITAR DATOS PERSONALES
          </h2>
          <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full text-black placeholder:text-gray-500"
              placeholder="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full text-black placeholder:text-gray-500"
              placeholder="Apellidos"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
            />
            <input
              type="email"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full text-black placeholder:text-gray-500"
              placeholder="Correo electrónico"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full text-black placeholder:text-gray-500"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full text-black placeholder:text-gray-500"
              placeholder="Domicilio"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full text-black placeholder:text-gray-500"
              placeholder="Teléfono"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full md:col-span-2 lg:col-span-1 text-black placeholder:text-gray-500"
              placeholder="DNI"
              name="dni"
              value={form.dni}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="mt-2 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded drop-shadow-lg transition-colors w-full md:col-span-2 lg:col-span-1 cursor-pointer"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      )}

      {view === 'misPedidos' && (
        <div className="flex flex-col justify-center items-start w-full p-6 md:p-12">
          <h2 className="text-[20px] md:text-3xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent mb-6">
            {orders.length>0 ? 'TODOS MIS PEDIDOS' : 'TÚ NO TIENES PEDIDOS'}
          </h2>

          {/* TBLA */}
          {orders.length>0 ? 
            (<>
              <OrdersTable orders={orders} setOrders={setOrders} getMyOrders={getMyOrders} deleteOrder={deleteOrder}></OrdersTable>
            </>) 
            : 
            (<>
              <div className="flex flex-col justify-center items-start gap-4">
                <p className="text-black">Antes de visitar esta sección, asegurate de al menos haber comprado un lote de productos, de lo contrario aquí no habrá nada más que espacio en blanco jeje</p>
                <a href="/" className="rounded px-6 py-2 font-semibold text-white bg-gradient-to-r from-black via-red-500 to-black">Comprar productos</a>
              </div>
            </>)
          }
          
        </div>
      )}


      <Footer router={router} user={user} setUser={setUser} getProfile={getProfile} />
    </div>
  );
}
