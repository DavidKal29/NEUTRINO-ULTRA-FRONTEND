"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {User} from '../../types/user'
import {OrderItem} from '../../types/orderItem'
import ProductsTable from "@/app/components/ProductsTable";

export default function ProductView() {
  const router = useRouter();
  const [user,setUser] = useState<User | null>(null)
  const [order,setOrder] = useState<OrderItem | null>(null)
  const {id} = useParams()
  console.log(id);
  


  const getProfile = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success){
          console.log(data.user);
            
          setUser(data.user)
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };

  const getOrder = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/getOrder/${id}`,{
      method:'GET',
      credentials:'include'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        if (data.order) {
          setOrder(data.order);
        }else{
          router.push('/*')
        }
      });
  };

  

  useEffect(() => {
    getProfile()
    getOrder()
  }, []);

  useEffect(() => {
    document.title = "Order Details";
  },[]);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100 relative overflow-hidden">
      <Header router={router} user={user} setUser={setUser} getProfile={getProfile} />

      <div className="bg-gray-200 p-4 md:p-8 lg:p-12 flex flex-col justify-center items-start gap-2 drop-shadow-lg w-full">
        <h2 className="text-[25px] sm:text-3xl md:text-5xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent">
          DETALLES DEL PEDIDO
        </h2>

        <div className="grid grid-cols-1 gap-2">
          <p className="font-semibold text-sm">NÚMERO DE PEDIDO: {order?._id}</p>
          <p className="font-semibold text-sm">FECHA: {new Date(order?.createdAt).toLocaleString()}</p>
          <p className="font-semibold text-sm">TOTAL: {order?.totalPrice.toFixed(2)}€</p>
          <p className="font-semibold text-sm">ESTADO: {order?.status}</p>
          <p className="font-semibold text-sm">MÉTODO DE PAGO: {order?.metodoPago}</p>
        </div>
        
      </div>


      <div className="w-full flex justify-center items-center flex-col gap-12 mt-6 mb-8 px-4">
        {/* Tabla */}
        <ProductsTable order={order}></ProductsTable>
      </div>

      <Footer router={router} user={user} setUser={setUser} getProfile={getProfile} />
    </div>
  );
}
