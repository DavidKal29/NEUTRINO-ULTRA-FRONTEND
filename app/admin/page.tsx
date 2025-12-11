"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useEffectEvent, useState } from "react";
import { User } from '../types/user';
import {OrderItem} from '../types/orderItem'
import {Product} from '../types/product'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AdminOrdersTable from "../components/AdminOrdersTable";
import AdminProductsTable from "../components/AdminProductsTable";
import AdminUsersTable from "../components/AdminUsersTable";

export default function Admin() {

  const [user, setUser] = useState<User | null>(null);
  
  const [orders,setOrders] = useState<OrderItem[] | []>([])
  const [users, setUsers] = useState<User[] | []>([]);
  const [products,setProducts] = useState<Product[] | []>([])

  const [csrfToken,setCsrfToken] = useState<string | ''>('')
                  
  const getCsrfToken = ()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf-token`, { credentials: 'include', method: 'GET' })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }
  
  const router = useRouter();
  const [view, setView] = useState<string | 'productos'>('productos');

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
        }else{
          router.push('/')     
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };

  const getAllOrders = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getAllOrders`, {
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

  const getAllProducts = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/getAllProducts`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        if (data.products) {
          setProducts(data.products)
        }else{
          toast.error(data.error)
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };

  const getAllUsers = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getAllUsers`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        if (data.users) {
          console.log(data.users);
          
          setUsers(data.users)
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
              getAllOrders()
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
    }as any);
  };

  const deleteUser = (id_user:string) => {
    toast("¿Seguro que quieres eliminar este usuario?", {
      action: {
        label: "Eliminar",
        onClick: () => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/deleteUser/${id_user}`, {
            method: 'GET',
            credentials: 'include'
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.success) {
              toast.success(data.success)
              getAllUsers()
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
    }as any);
  };

  const downloadPdf = async (orders:OrderItem[]) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getPDFOrdersResume`, {
        method: 'POST',
        credentials:'include',
        headers: {'Content-Type': 'application/json','CSRF-Token':csrfToken},
        body: JSON.stringify(orders)
      });
  
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
  
      const a = document.createElement('a')
      a.href = url;
      a.download = `resumen_pedidos_${new Date().toLocaleDateString("es-ES")}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)
  
    } catch (error) {
      console.log(error);
      toast.error('No se pudo descargar el PDF')
    }
  }

  

  useEffect(() => {
    document.title = 'Admin Panel';
  }, []);

  useEffect(() => {
    getProfile();
    getCsrfToken()
  }, []);

  useEffect(()=>{
    if (view === 'productos') {
      getAllProducts()
    }
    
    if (view === 'pedidos') {
      getAllOrders()
    }
    
    if (view === 'usuarios') {
      getAllUsers()
    }
  },[view])

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-white relative overflow-hidden">
        <Header router={router} user={user} setUser={setUser} getProfile={getProfile} />

        <div className="bg-gray-200 p-4 md:p-8 lg:p-12 flex flex-col justify-center items-start gap-2 drop-shadow-lg w-full">
            <h2 className="text-[25px] sm:text-3xl md:text-5xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent">
            PANEL DE GESTIÓN
            </h2>

            <div className="flex justify-center items-center gap-2 text-[15px]">
              <button onClick={() => setView('productos')} className={`cursor-pointer ${view === 'productos' ? 'text-gray-600 font-bold' : 'text-gray-400'}`}>PRODUCTOS</button>
              
              <p className="text-gray-600">/</p>
              
              <button onClick={() => setView('pedidos')} className={`cursor-pointer ${view === 'pedidos' ? 'text-gray-600 font-bold' : 'text-gray-400'}`}>PEDIDOS</button>
              
              {user?.rol === 'superadmin' && (<>
                <p className="text-gray-600">/</p>
                <button onClick={() => setView('usuarios')} className={`cursor-pointer ${view === 'usuarios' ? 'text-gray-600 font-bold' : 'text-gray-400'}`}>USUARIOS</button> 
              </>)}
            </div>


        </div>

        {view === 'productos' && (
            <div className="flex flex-col justify-center items-start w-full p-6 md:p-12">
                <h2 className="text-[20px] md:text-3xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent mb-6">
                    TODOS LOS PRODUCTOS
                </h2>
        
                {/* TABLA */}
                {products.length>0 ? 
                    (<>
                        <AdminProductsTable products={products}></AdminProductsTable>
                    </>) 
                    : 
                    (<>
                        <div className="flex flex-col justify-center items-start gap-4">
                            <p className="text-black">AL parecer, no hay ni un solo producto en la tienda, esto es perjudicial para nosotros como empresa, ya que nadie podrá comprar nada.</p>
                            <a href="/" className="rounded px-6 py-2 font-semibold text-white bg-gradient-to-r from-black via-red-500 to-black">Volver al Inicio</a>
                        </div>
                    </>)
                }
                    
            </div>
        )}



        {view === 'pedidos' && (
            <div className="flex flex-col justify-center items-start w-full p-6 md:p-12">
                <h2 className="text-[20px] md:text-3xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent mb-6">
                    {orders.length>0 ? 'TODOS LOS PEDIDOS' : 'NO HAY PEDIDOS REGISTRADOS'}
                </h2>

                <button onClick={()=>{downloadPdf(orders)}} className="font-semibold mb-6 cursor-pointer text-black">
                  Generar resumen de pedidos y ganancias totales <i className="fa-solid fa-file text-red-500"></i>
                </button>
        
                {/* TABLA */}
                {orders.length>0 ? 
                    (<>
                        <AdminOrdersTable orders={orders} setOrders={setOrders} getMyOrders={getAllOrders} deleteOrder={deleteOrder}></AdminOrdersTable>
                    </>) 
                    : 
                    (<>
                        <div className="flex flex-col justify-center items-start gap-4">
                            <p className="">AL parecer, ningún usuario ha realizado un solo pedido, esto es perjudicial para nosotros como empresa, ya que eso signfica que no estamos ganando ni un solo céntimo</p>
                            <a href="/" className="rounded px-6 py-2 font-semibold text-white bg-gradient-to-r from-black via-red-500 to-black">Volver al Inicio</a>
                        </div>
                    </>)
                }
                    
            </div>
        )}

        {view === 'usuarios' && (
            <div className="flex flex-col justify-center items-start w-full p-6 md:p-12">
                <h2 className="text-[20px] md:text-3xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent mb-6">
                    {users.length>0 ? 'TODOS LOS USUARIOS' : 'NO HAY USUARIOS'}
                </h2>

                <a href="/createUser" className="font-semibold mb-6 cursor-pointer text-black">
                  Crear Nuevo Usuario <i className="fa-solid fa-user-plus text-red-500"></i>
                </a>
        
                {/* TABLA */}
                {users.length>0 ? 
                    (<>
                        <AdminUsersTable users={users} setUsers={setUsers} getAllUsers={getAllUsers} deleteUser={deleteUser}></AdminUsersTable>
                    </>) 
                    : 
                    (<>
                        <div className="flex flex-col justify-center items-start gap-4">
                            <p className="">AL parecer, no hay ni un solo usuario, esto es perjudicial para nosotros como empresa, ya que eso signfica que no estamos ganando ni un solo céntimo</p>
                            <a href="/" className="rounded px-6 py-2 font-semibold text-white bg-gradient-to-r from-black via-red-500 to-black">Volver al Inicio</a>
                        </div>
                    </>)
                }
                    
            </div>
        )}

      <Footer router={router} user={user} setUser={setUser} getProfile={getProfile} />
    </div>
  );
}
