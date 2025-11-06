"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {Product} from './types/product'
import NewProducts from "./components/NewProducts";
import Products from "./components/Products";

export default function Home() {

    type RequiredProduct = Required<Product>

    const [products,setProducts] = useState<RequiredProduct[]>([])

    const [category,setCategory] = useState('inicio')

    const categories = ['inicio','moviles','tablets','portatiles','ordenadores']

    const changeCategory = (c:string)=>{
      setCategory(c)
    }

    const getProducts = (c:string)=>{
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${c === 'inicio' ? 'getNewProducts' : `getProducts/${c}`}`)
      .then(res=>res.json())
      .then(data=>{
        if (data.products) {
          setProducts(data.products)
        }else{
          alert(data.error)
        }
      })
    }


    useEffect(()=>{
      getProducts(category)
    },[])

    return (
      <div className="flex flex-col justify-start items-center min-h-screen bg-gray-200 relative overflow-hidden">
        <Header />
        <div className="bg-white p-4 max-[360px]:gap-2 gap-4 flex justify-start items-center max-[360px]:text-sm text-md md:gap-6 lg:gap-12 lg:px-12 drop-shadow-md overflow-hidden overflow-x-auto w-full">
          {categories.map(c=>(
            <button onClick={()=>{changeCategory(c);getProducts(c)}} className={`cursor-pointer font-semibold ${category === c ? 'underline decoration-red-500 decoration-2' : ''}`}>{c[0].toUpperCase() + c.slice(1)}</button>
          ))}
        </div>

        {category === 'inicio' ? (<><NewProducts products={products}></NewProducts></>) : (<><Products products={products} category={category}></Products></>)}
        
          

        <Footer></Footer>
        
      </div>


      

    );
}

