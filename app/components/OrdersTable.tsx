import React from 'react'
import {OrderItem} from '../types/orderitem'

interface OrdersTableProps{
    orders:OrderItem[]
}

export default function OrdersTable({orders}:OrdersTableProps) {
  return (
    <div className="overflow-x-auto w-full max-w-[1200px] rounded scrollbar-hide text-white drop-shadow-xl">
        <table className="w-full whitespace-nowrap border-none">
            <thead className="text-white bg-[#C40C0C]">
                <tr>
                <th className="px-2 py-1 text-[20px] text-md font-bold text-center">Número de Pedido</th>
                <th className="px-2 py-1 text-[20px] text-md font-bold text-center">Fecha</th>
                <th className="px-2 py-1 text-[20px] text-md font-bold text-center">Total</th>
                <th className="px-2 py-1 text-[20px] text-md font-bold text-center">Estado</th>
                <th className="px-2 py-1 text-[20px] text-md font-bold text-center">Detalles</th>
                <th className="px-2 py-1 text-[20px] text-md font-bold text-center">Factura</th>
                </tr>
            </thead>
                
            <tbody className="text-black">
            {orders.map((order:OrderItem, index:number)=>(
                <tr key={index} className="odd:bg-white even:bg-gray-200">
                <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">{order._id}</td>
                <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">{order.totalPrice}€</td>
                <td className={`px-2 py-1 text-[16px] text-sm font-semibold text-center ${order.status ? 'text-green-500' : 'text-red-600'}`}>{order.status ? <p>Entregado</p> : <p>No Entregado</p>}</td>
                <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">Ver Detalles</td>
                <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">Descargar PDF</td>
                </tr> 
            ))}

                
            </tbody>
        </table>
    </div>
  )
}
