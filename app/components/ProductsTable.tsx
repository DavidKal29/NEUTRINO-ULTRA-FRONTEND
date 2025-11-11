import React from "react";
import {CartItem} from '../types/cartItem'
import {Orderitem} from '../types/orderItem'

interface ProductsTableProps {
    order:Orderitem
}

export default function ProductsTable({order}:ProductsTableProps) {
  return (
    <div className="overflow-x-auto w-full max-w-[1200px] rounded scrollbar-hide text-white drop-shadow-xl">
        <table className="w-full whitespace-nowrap border-none">
            <thead className="text-white bg-[#C40C0C]">
                <tr>
                    <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                    Imagen
                    </th>
                    <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                    Nombre
                    </th>
                    <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                    Precio Unitario
                    </th>
                    <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                    Cantidad
                    </th>
                    <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                    Total
                    </th>
                </tr>
            </thead>

            <tbody className="text-black">
                {order?.products.map((product: CartItem, index: number) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-200">
                        <td className="px-2 py-3 text-center">
                            <div className="flex justify-center items-center">
                                <img
                                className="w-20 h-20"
                                src={`/images/products/${product.image}`}
                                alt={product.name}
                                />
                            </div>
                        </td>

                        <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                            {product.name}
                        </td>
                        <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                            {product.price}€
                        </td>
                        <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                            {product.quantity}
                        </td>
                        <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                            {(product.quantity * product.price).toFixed(2)}€
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}
