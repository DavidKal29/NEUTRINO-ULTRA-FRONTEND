import React, { useState } from 'react'
import {User} from '../types/user'
import { toast } from 'sonner'

interface UsersTableProps{
    users:User[],
    setUsers:(users:User[] | [])=>void,
    getAllUsers:()=>void,
    deleteUser:(id_user:string)=>void
}

export default function AdminUsersTable({users,setUsers,getAllUsers,deleteUser}:UsersTableProps) {

    return (
        <div className="overflow-x-auto w-full max-w-[1500px] rounded scrollbar-hide text-white drop-shadow-xl">
            <table className="w-full whitespace-nowrap border-none">
                <thead className="text-white bg-[#C40C0C]">
                    <tr>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Rol
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Username
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Nombre
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Apellido
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Email
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            DNI
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Teléfono
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Dirección
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Editar
                        </th>
                        <th className="px-2 py-1 text-[20px] text-md font-bold text-center">
                            Eliminar
                        </th>
                        
                    </tr>
                </thead>
                    
                <tbody className="text-black">
                    {users.map((user:User, index:number)=>(
                        <tr key={index} className="odd:bg-white even:bg-gray-200">

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {user.rol}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {user.username}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {user.name}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {user.lastname}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {user.email}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {user.dni || 'No tiene'}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {user.phone || 'No tiene'}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                {user.address || 'No tiene'}
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                <a href='' target='_blank'>
                                    <i className="fa-solid fa-pen-to-square text-red-600 cursor-pointer text-[25px]"></i>
                                </a>
                            </td>

                            <td className="px-2 py-3 text-[16px] text-sm font-semibold text-center">
                                <button onClick={()=>{deleteUser(user?._id.toString())}} className='bg-red-500 text-white rounded-full py-3 cursor-pointer px-3 cursor-pointer'>
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
