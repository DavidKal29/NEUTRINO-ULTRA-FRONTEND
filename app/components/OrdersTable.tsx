import React, { useState } from 'react'
import {OrderItem} from '../types/orderitem'
import {CartItem} from '../types/cartItem'
import { toast } from 'sonner'

interface OrdersTableProps{
    orders:OrderItem[],
    setOrders:(orders:OrderItem[] | [])=>void,
    getMyOrders:()=>void,
    deleteOrder:(id_order:string)=>void
}

export default function OrdersTable({orders,setOrders,getMyOrders,deleteOrder}:OrdersTableProps) {
    const repeatOrder = (products:CartItem[])=>{
        localStorage.setItem('cart',JSON.stringify(products))
        toast.success('Pedido copiado al carrito')
        window.dispatchEvent(new Event('storage'))
    }

    return (
        <div className="overflow-x-auto w-full max-w-[1200px] rounded scrollbar-hide text-white drop-shadow-xl">
            <table className="w-full whitespace-nowrap border-none">
                <thead className="text-white bg-[#C40C0C]">
                    <tr>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Número de Pedido
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Fecha
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Total
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Estado
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Detalles
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Factura
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Repetir Pedido
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Eliminar
                        </th>
                    </tr>
                </thead>
                    
                <tbody className="text-black">
                    {orders.map((order:OrderItem, index:number)=>(
                        <tr key={index} className="odd:bg-white even:bg-gray-200">
                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {order._id}
                            </td>
                            
                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {new Date(order.createdAt).toLocaleString()}
                            </td>
                            
                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {order.totalPrice.toFixed(2)}€
                            </td>
                            
                            <td className={`px-2 py-1 text-[16px] text-sm font-semibold text-center ${order.status ? 'text-green-500' : 'text-red-600'}`}>
                                {order.status ? <p>Entregado</p> : <p>No Entregado</p>}
                            </td>
                            
                            <td className="cursor-pointer px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                <a href={`/orderDetails/${order._id}`}  target='_blank'>Ver Detalles</a>
                            </td>
                            
                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                Descargar PDF
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                <button onClick={()=>{repeatOrder(order?.products)}} className='bg-blue-500 text-white rounded-full py-3 cursor-pointer px-3 cursor-pointer'>
                                    <i className='fa-solid fa-repeat'></i>
                                </button>
                            </td>
                            
                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                <button onClick={()=>{deleteOrder(order?._id)}} className='bg-red-500 text-white rounded-full py-3 cursor-pointer px-3 cursor-pointer'>
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                            </td>
                        </tr>  
                    ))}
    
                </tbody>
            </table>
        </div>
    )
}
