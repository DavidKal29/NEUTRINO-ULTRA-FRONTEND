import React from 'react'

interface MenuCategoriesProps{
    categories:string[],
    category:string,
    changeCategory:(category:string)=>void,
    getProducts:(category:string)=>void

}

export default function MenuCategories({categories,category,changeCategory,getProducts}:MenuCategoriesProps) {
  return (
    <div className="bg-white p-4 max-[360px]:gap-2 gap-4 flex justify-start items-center max-[360px]:text-sm text-md md:gap-6 lg:gap-12 lg:px-12 drop-shadow-md overflow-hidden overflow-x-auto w-full">
        {categories.map((c:string,index:number)=>(
            <button key={index} onClick={()=>{changeCategory(c);getProducts(c)}} className={`cursor-pointer text-black font-semibold ${category === c ? 'underline decoration-red-500 decoration-2' : ''}`}>{c[0].toUpperCase() + c.slice(1)}</button>
        ))}
    </div>
  )
}
