import React, { useState } from 'react'
import {Product} from '../types/product'
import { toast } from 'sonner'

interface ProductsTableProps{
    products:Product[]
}

export default function AdminProductsTable({products}:ProductsTableProps) {

    const [activeMap,setActiveMap] = useState<Record<string,string>>({})

    const changeProductActive = (id_product:string,new_active:string) =>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/changeProductActive/${id_product}/${new_active}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.success) {
                toast.success(data.success)
            }else{
                toast.error(data.error)
            }
        })
    }

    return (
        <div className="overflow-x-auto w-full max-w-[1500px] rounded scrollbar-hide text-white drop-shadow-xl">
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
                            Precio
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Stock
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Ventas
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Editar
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Estado
                        </th>
                    </tr>
                </thead>
                    
                <tbody className="text-black">
                    {products.map((product:Product, index:number)=>(
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
                                {product.price.toFixed(2)}€
                            </td>
                            
                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {product.stock}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {product.sales}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                <a href={`/editProduct/${product?._id}`}>
                                    <i className="fa-solid fa-pen-to-square text-red-600 cursor-pointer text-[25px]"></i>
                                </a>
                            </td>

                            <td className="px-2 py-1 text-[16px] text-sm font-semibold text-center">
                                <div className="flex justify-center items-center gap-2">
                                    <select 
                                        className="px-2 py-1 border rounded" 
                                        value={activeMap[`product-${product._id}`] || product.active}
                                        onChange={(e)=>{
                                            setActiveMap((prev)=>({
                                                ...prev,
                                                [`product-${product?._id}`]:e.target.value
                                            }))
                                        }}
                                    >
                                        <option value="on">Activo</option>
                                        <option value="off">Inactivo</option>
                                        <option value="dead">Descatalogado</option>
                                    </select>

                                    <button 
                                    onClick={()=>{
                                        changeProductActive(product._id,activeMap[`product-${product._id}`] || product.active)
                                    }}
                                    className="cursor-pointer text-center bg-gradient-to-r from-red-500 to-red-800 text-white font-semibold rounded px-4 py-1">
                                        Guardar
                                    </button>
                                </div>
                            </td>
                            
                        </tr>  
                    ))}
    
                </tbody>
            </table>
        </div>
    )
}
